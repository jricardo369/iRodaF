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
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  usuario: any;
  usuarioo: any;
  sexo: any;
  correoElectronico: any;
  nombre: any;
  telefono: any;
  contrasenia: any;
  estatus: any;
  totalMultas: any;
  listado: any;
  respuestaUser: any;
  idUsuario: any;
  idRol: any;
  mensaje: any;
  msjError: any;
  idrol: any;
  idUser: any;
  sociedad: any;
  clasesRestantes: any;
  mostrarUs: any;
  tipoPaquete: any;
  contadorFaltas: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicio: LoginService,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private alertController: AlertController,
    private navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user.respuesta;
      this.sociedad = user.respuesta.sociedad;
      this.idUser = user.respuesta.idUsuario;
      console.log('Datos del usuario en editarperfil:', this.usuario);
      console.log(this.idUser, 'Id del usuario en editar perfil');
    });
  }

  ionViewWillEnter() {
    this.usuarioo = this.activatedRoute.snapshot.paramMap.get('usuario');
    this.contrasenia = this.activatedRoute.snapshot.paramMap.get('contrasenia');
    /*this.idUsuario = this.activatedRoute.snapshot.paramMap.get("idUsuario");
    this.idRol = this.activatedRoute.snapshot.paramMap.get("idRol");
    this.usuarioo = this.activatedRoute.snapshot.paramMap.get("usuario");
    this.sexo = this.activatedRoute.snapshot.paramMap.get("sexo");
    this.correoElectronico = this.activatedRoute.snapshot.paramMap.get("correoElectronico");
    this.nombre = this.activatedRoute.snapshot.paramMap.get("nombre");
    this.telefono = this.activatedRoute.snapshot.paramMap.get("telefono");
    this.contrasenia = this.activatedRoute.snapshot.paramMap.get("contrasenia");
    this.estatus = this.activatedRoute.snapshot.paramMap.get("estatus");
    this.totalMultas = this.activatedRoute.snapshot.paramMap.get("totalMultas");
    this.clasesRestantes = '10';*/

    console.log(this.usuarioo, 'Usuario');

    this.servicio
      .getData(this.urlapi + 'Usuarios/usuario/' + this.usuarioo)
      .subscribe((data) => {
        console.log(data, 'informacion del perfil seleccionado');
        this.listado = data;
        this.respuestaUser = this.listado.respuesta[0];
        this.idUsuario = this.respuestaUser.idUsuario;
        this.idRol = this.respuestaUser.idRol;
        this.tipoPaquete = this.respuestaUser.tipoPaquete;
        if (this.idRol == '2') {
          if (this.tipoPaquete != 'Mensual') {
            this.mostrarUs = true;
          } else {
            this.mostrarUs = false;
          }
        } else {
          this.mostrarUs = false;
        }
        this.usuarioo = this.respuestaUser.usuario;
        this.sexo = this.respuestaUser.sexo;
        this.correoElectronico = this.respuestaUser.correoElectronico;
        this.nombre = this.respuestaUser.nombre;
        this.clasesRestantes = this.respuestaUser.clasesRestantes;
        this.telefono = this.respuestaUser.telefono;
        this.totalMultas = this.respuestaUser.totalMultas;
        this.contadorFaltas = this.respuestaUser.contadorFaltas;
      });
  }

  ep = {
    idUsuario: '',
    rol: '',
    usuario: '',
    contrasenia: '',
    nombre: '',
    sexo: '',
    correoElectronico: '',
    peso: '',
    altura: '--',
    imc: '--',
    telefono: '',
    nivel: '',
    estatus: '',
    intentos: '',
    clasesRestantes: '',
  };

  submitted = false;

  // Metodos

  editarUsuario(form: NgForm) {
    let obj = {
      idUsuario: this.idUsuario,
      idRol: this.ep.rol ||this.idRol ,
      usuario: this.ep.usuario || this.usuarioo,
      contrasenia: this.ep.contrasenia || this.contrasenia,
      nombre: this.ep.nombre || this.nombre,
      sexo: this.ep.sexo || this.sexo,
      correoElectronico: this.ep.correoElectronico || this.correoElectronico,
      peso: 0,
      altura: 0,
      imc: '--',
      telefono: this.ep.telefono || this.telefono,
      nivel: '10',
      estatus: this.ep.estatus || this. estatus,
      intentos: 0,
      clasesRestantes: this.ep.clasesRestantes || this.clasesRestantes,
    };

    this.submitted = true;

    if (form.valid) {
      this.servicio.editarUsuario(obj).subscribe((response: any) => {
        this.mensaje = response.respuesta;

        if (response.codigo === 200) {
          this.actualizado();
          this.navCtrl.navigateRoot('/perfil');
        } else {
          this.actualizado();
        }
      });
    } else {
      this.todoslosCampos();
    }

    console.log(obj, 'editar perfil');
  }

  activarUser(idUsuario: any) {
    this.servicio.activarUser(idUsuario).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, 'Usuario Activado');
        this.userActivado();
      } else {
        this.msjError();
      }
    });
    // this.navCtrl.navigateRoot('/perfil');
  }

  desactivarUser(idUsuario: any) {
    this.servicio.desactivarUser(idUsuario).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, 'Usuario Desactivado');
        this.userDesactivado();
      } else {
        this.msjError();
      }
    });
    // this.navCtrl.navigateRoot('/perfil');
  }

  bPago(idUsuario: any) {
    this.servicio.bloquePorPago(idUsuario).subscribe((response: any) => {
      this.mensaje = response.descripcion;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, 'Usuario desactivado por pago');
        this.userDesactivado();
      } else {
        this.msjError();
      }
    });
  }

  eliminarFaltas(idUsuario: any, nombre: any) {
    console.log('Eliminar faltas', idUsuario, nombre);
    console.log('totalMultas' + this.totalMultas);
    this.presentAlertConfirm(idUsuario, nombre);
  }

  verPaquetes(idUsuario: any) {
    this.navCtrl.navigateRoot(
      'crearpaquete/' + idUsuario + '/' + this.sociedad + '/' + this.idRol
    );
    console.log(idUsuario);
  }

  // Alerta actualizado
  async actualizado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async errActiDesac() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.msjError,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Alertas de activo e inactivo

  async userActivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async userDesactivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Fin alertas activo o inactivo

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async userLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando',
      duration: 1000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentAlertConfirm(idUsuario: any, nombre: any) {
    console.log('Seguro que se eliminaran todas las multas');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Seguro que desea eliminar las multas de ' + nombre,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Multas eliminadas');
            this.faltasEliminar(idUsuario);
          },
        },
      ],
    });
    await alert.present();
  }

  async quitarFalta(idUsuario: any) {
    console.log('Contador faltas:' + this.contadorFaltas);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Deseas agregar o eliminar una falta a ' + this.nombre,
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar una falta');
            this.ajustarFalta(idUsuario, 'E');
          },
        },
        {
          text: 'Agregar',
          handler: () => {
            console.log('Eliminar una falta');
            this.ajustarFalta(idUsuario, 'I');
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
      ],
    });
    await alert.present();
  }

  faltasEliminar(idUsuario: any) {
    this.servicio
      .eliminarFaltas(idUsuario, this.idUser)
      .subscribe((response: any) => {
        this.mensaje = response.descripcion;
        if (response.codigo == 500) {
          this.deleteClase();
          console.log('ID de usuario sin faltas', idUsuario);
          this.navCtrl.navigateRoot('/perfil');
          // this.navCtrl.navigateRoot("/clases");
        } else {
          this.deleteClase();
          this.totalMultas = response.respuesta.totalMultas;
        }
      });
  }

  ajustarFalta(idUsuario: any, tipo: any) {
    console.log('usuario:' + idUsuario);
    console.log('usuario modi:' + this.idUser);
    var p = 0;
    if (tipo === 'E') {
      if (this.contadorFaltas === 0) {
        p = 1;
      }
    }

    if (p === 0) {
      this.servicio
        .ajustarFalta(idUsuario, this.idUser, tipo)
        .subscribe((response: any) => {
          this.mensaje = response.descripcion;
          if (response.codigo == 500) {
            this.deleteClase();
            console.log('ID de usuario sin faltas', idUsuario);
            this.navCtrl.navigateRoot('/perfil');
            // this.navCtrl.navigateRoot("/clases");
          } else {
            this.deleteClase();
            this.contadorFaltas = response.respuesta.contadorFaltas;
          }
        });
    } else {
      this.mensaje = 'No puede quitar falta ya que no cuenta con una';
      this.deleteClase();
    }
  }

  async deleteClase() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async deleteFaltas() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    this.userLoading();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  
}
