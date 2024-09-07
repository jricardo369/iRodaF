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
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  usuario: any;
  idrol: any;
  bloq: any;
  idUser: any;
  nombre: any;
  mensaje: any;
  listado: any;
  respuestaUser: any;
  idUsuario: any;
  sociedad: any;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private servicio: LoginService,
    private alertController: AlertController
  ) {
    console.log('Inicio del constructor');
  }
  ngOnInit() {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;
      console.log('Datos del usuario:', this.usuario);
      this.idrol = this.usuario.respuesta.idRol;
      this.bloq = this.usuario.respuesta.estatus;
      this.idUser = this.usuario.respuesta.idUsuario;
      this.nombre = this.usuario.respuesta.nombre;
      this.idUsuario = this.usuario.respuesta.idUsuario;
      this.sociedad = this.usuario.respuesta.sociedad;

      console.log(this.idrol, 'Rol de usuario en Menu');
      console.log(this.idUser, 'Id del usuario');
      this.servicio
        .getData(
          this.urlapi +
            'Usuarios/usuario-con-mensaje/' +
            this.idUsuario +
            '?sociedad=' +
            this.sociedad
        )
        .subscribe((data) => {
          console.log(data, 'informacion del perfil seleccionado');
          this.listado = data;
          this.respuestaUser = this.listado.respuesta[0];
          this.mensaje = this.respuestaUser.mensaje;
        });

      this.bloqueado(this.idUser);
    });
  }

  caladmin() {
    this.navCtrl.navigateRoot('/caladmin');
  }

  paquetes() {
    this.navCtrl.navigateRoot('/paquetes');
  }

  perfil() {
    this.navCtrl.navigateRoot('/perfil');
  }

  user() {
    this.navCtrl.navigateRoot('/user');
  }

  calalumno() {
    this.navCtrl.navigateRoot('/calalumno');
  }

  clases() {
    this.navCtrl.navigateRoot('/clases');
  }

  asuetos() {
    this.navCtrl.navigateRoot('/asuetos');
  }

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

  async usuarioBloqueado() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Usuario bloqueado',
      buttons: ['OK'],
    });
    await alert.present();
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
        } else {
          this.navCtrl.navigateRoot('/admin');
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
