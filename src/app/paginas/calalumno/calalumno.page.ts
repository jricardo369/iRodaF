import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  NavParams,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-calalumno',
  templateUrl: './calalumno.page.html',
  styleUrls: ['./calalumno.page.scss'],
})
export class CalalumnoPage implements OnInit {
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  date: any;
  fecha: any;
  fechaf: any;
  usuario: any;
  numeroUsuario: any;
  idUsuario: any;
  idRol: any;
  listado: any;
  nombre: any;

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
    private navParams: NavParams,
    private servicio: LoginService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get('DatosUsuario').then((data) => {
      this.usuario = data;
      console.log(
        'El usuario en CALENDARIO es :',
        this.usuario.respuesta.nombre
      );
      console.log('El ID del usuario es  :', this.usuario.respuesta.idUsuario);
      console.log('El Rol del usuario es : ', this.usuario.respuesta.idRol);
      console.log('El estatus del usuario es:', this.usuario.respuesta.estatus);

      this.numeroUsuario = this.usuario.respuesta.idUsuario;
      this.idRol = this.usuario.respuesta.idRol;

      this.bloqueado(this.numeroUsuario);
    });
  }
  ngOnInit() {
    this.loadingInicio();
  }

  fechaSeleccionada(date: any) {
    this.fechaf = this.date.substring(0, 10);

    console.log('cambios pendientes');

    console.log('Click en fecha ', this.fechaf);

    this.navCtrl.navigateRoot('/horarios/' + this.fechaf);
  }

  // Cerrar sesión

  cerrarSesion() {
    this.storage.clear();
    console.log('Sesion Cerrada (storage clear)', this.storage);
    this.cerrandoSesion();
    this.navCtrl.navigateRoot('/login');
  }

  async cerrandoSesion() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      translucent: true,
      message: 'Cerrando sesion',
      duration: 700,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async confirmCerrar() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.cerrarSesion();
            console.log('Aceptar');
          },
        },
      ],
    });

    await alert.present();
  }
  // Fin cerrar sesión

  atras() {
    this.navCtrl.navigateRoot('/admin');
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

  async loadingInicio() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando',
      duration: 700,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
