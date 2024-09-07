import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  NavParams,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  usuario: any;
  idRol: any;
  numeroUsuario: any;
  idUsuario: any;
  nombre: any;
  telefono: any;
  email: any;
  sexo: any;
  mensaje: any;
  user: any;
  membresia: any;
  listado: any;
  respuestaUser: any;
  multas: any;
  faltas: any;
  mensajeM: any;
  confaltas: any;
  sinfaltas: any;
  rol: any;

  idClase: any;
  nombreP: any;
  profesorP: any;
  fechafP: any;
  profesorNombreP: any;
  descripcionHorarioP: any;

  constructor(
    private storage: Storage,
    private navParams: NavParams,
    private navCtrl: NavController,
    private servicio: LoginService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = this.navParams.get(this.usuario);

    this.storage.get('DatosUsuario').then((data: any) => {
      this.usuario = data;
      console.log('user :', data);

      console.log('El usuario en USER es :', this.usuario.respuesta.nombre);
      console.log('El ID del usuario es  :', this.usuario.respuesta.idUsuario);
      console.log('El Rol del usuario es : ', this.usuario.respuesta.idRol);
      console.log('El estatus del usuario es:', this.usuario.respuesta.estatus);
      this.rol = this.usuario.respuesta.idRol;

      this.numeroUsuario = this.usuario.respuesta.idUsuario;

      this.servicio
        .getData(this.urlapi + 'Usuarios/id_usuario/' + this.numeroUsuario)
        .subscribe((data: any) => {
          console.log(data, 'informacion del perfil seleccionado');
          this.listado = data;
          this.respuestaUser = this.listado.respuesta[0];
          this.email = this.respuestaUser.correoElectronico;
          this.telefono = this.respuestaUser.telefono;
          this.membresia = this.respuestaUser.membresiaDesc;
          this.sexo = this.respuestaUser.sexo;
          this.nombre = this.respuestaUser.nombre;
          this.user = this.respuestaUser.usuario;

          this.multas = this.usuario.respuesta.totalMultas;
          this.faltas = this.usuario.respuesta.contadorFaltas;

          if (this.multas != 0 || this.faltas != 0) {
            this.mensajeM =
              'Cuentas con ' +
              this.multas +
              ' multas y ' +
              this.faltas +
              ' faltas';
            this.confaltas = true;
            this.sinfaltas = false;
          } else {
            this.mensajeM = 'No tienes multas ni faltas';
            this.confaltas = false;
            this.sinfaltas = true;
          }
        });

      this.bloqueado(this.numeroUsuario);
    });
  }

  eu = {
    idUsuario: '',
    telefono: '',
    correoElectronico: '',
  };

  verAsistencias() {
    this.navCtrl.navigateRoot('/asistenciasusuario');
  }

  editarUser() {
    let obj = {
      idUsuario: this.numeroUsuario,
      telefono: this.eu.telefono,
      correoElectronico: this.eu.correoElectronico,
    };

    this.servicio.editarUser(obj).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      if (response.codigo === 200) {
        this.actualizado();
        this.navCtrl.navigateRoot('/admin');
      } else {
        this.actualizado();
      }
    });
  }

  async actualizado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    this.userLoading();
  }

  atras() {
    if (this.usuario.respuesta.idRol === 1) {
      // this.navCtrl.navigateRoot('/caladmin');
      this.navCtrl.navigateRoot('/admin');
    } else {
      // this.navCtrl.navigateRoot('/calalumno');
      this.navCtrl.navigateRoot('/admin');
    }
  }

  cambiarpass() {
    this.navCtrl.navigateRoot('/cambiarpass');
  }

  async userLoading() {
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
