import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cambiarpass',
  templateUrl: './cambiarpass.page.html',
  styleUrls: ['./cambiarpass.page.scss'],
})
export class CambiarpassPage implements OnInit {
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  cp = {
    idUsuario: '',
    contraseniaAnterior: '',
    contraseniaNueva: '',
    confirmarpass: '',
  };

  mensaje: any;
  mensajerr: any;
  submitted = false;
  numeroUsuario: any;
  usuario: any;
  idUsuario: any;
  idRol: any;

  constructor(
    private servicio: LoginService,
    private storage: Storage,
    public toastController: ToastController,
    public alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {
    console.log('entro al constructor');

    this.storage.get('DatosUsuario').then((data) => {
      this.usuario = data;
      console.log('user :', data);

      console.log('El usuario en USER es :', this.usuario.respuesta.nombre);
      console.log('El ID del usuario es  :', this.usuario.respuesta.idUsuario);
      console.log('El Rol del usuario es : ', this.usuario.respuesta.idRol);
      console.log('El estatus del usuario es:', this.usuario.respuesta.estatus);

      this.numeroUsuario = this.usuario.respuesta.idUsuario;

      this.bloqueado(this.numeroUsuario);
    });
  }

  ngOnInit() {
    this.cambioloading();
  }

  atras() {
    this.navCtrl.navigateRoot('/user');
  }

  passNuevo(form: NgForm) {
    let obj = {
      idUsuario: this.numeroUsuario,
      contraseniaAnterior: this.cp.contraseniaAnterior,
      contraseniaNueva: this.cp.contraseniaNueva,
    };
    this.submitted = true;

    if (this.cp.contraseniaNueva === this.cp.confirmarpass) {
      this.servicio.cambiarPass(obj).subscribe((response: any) => {
        console.log(response, 'Password cambiado');

        this.mensaje = response.respuesta;

        this.mensajerr = response.descripcion;

        if (response.codigo == 200) {
          this.cambiopassLoading();
          this.storage.clear();
          this.navCtrl.navigateRoot('/login');
        } else {
          this.erroPass();
          this.clearForm();
        }
      });
    } else {
      this.passIncorrecto();
      this.clearForm();
    }
  }

  async passIncorrecto() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no coinciden.',
      duration: 1000,
    });
    toast.present();
  }

  async erroPass() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajerr,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async cambiopassLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: this.mensaje,
      duration: 700,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  clearForm() {
    this.cp.contraseniaAnterior = '';
    this.cp.contraseniaNueva = '';
    this.cp.confirmarpass = '';
  }

  async cambioloading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando',
      duration: 700,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  bloqueado(idUsuario: any) {
    this.servicio
      .getData(
        'http://localhost:8080/control_asistencias_api/Usuarios/bloqueo-por-pago/' +
          idUsuario
      )
      .subscribe((data) => {
        this.usuario = data;
        console.log(data);

        if (this.usuario.codigo === 500) {
          this.storage.clear();
          this.navCtrl.navigateRoot('/login');
          this.msjBloqueado(this.usuario.descripcion);
        }
      });

    return;
  }

  async msjBloqueado(descripcion: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: descripcion,
      // message: descripcion,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
