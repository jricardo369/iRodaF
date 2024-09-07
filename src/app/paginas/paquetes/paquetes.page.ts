import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-paquetes',
  templateUrl: './paquetes.page.html',
  styleUrls: ['./paquetes.page.scss'],
})
export class PaquetesPage implements OnInit {
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  ionViewWillEnter() {
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('idUsuario');
    this.sociedad = this.activatedRoute.snapshot.paramMap.get('sociedad');

    console.log('idUsaurio para nuevo paquete', this.idUsuario);
    console.log('Sociedad para nuevo paquete', this.sociedad);
  }

  usuario: any;
  usuarioData: any;
  fecha: any;
  mensaje: any;
  mensajeErr: any;
  idUsuario: any;
  sociedad: any;
  idUser: any;
  codigo: any;
  inscripcionesE: any;
  inscripciones: any;
  tipoIns: any;
  pago: any;
  pagoE: any;
  tipoPago: any;
  tipoDePagoS: any;
  tipoDePago: any;

  np = {
    idUsuario: '',
    tipoPago: '',
    tipoInscripcion: '',
    fecha: '',
    comentario: '',
    sociedad: '',
  };

  submitted = false;

  constructor(
    private navCtrl: NavController,
    private servicio: LoginService,
    private loadingController: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private navParams: NavParams,
    private storage: Storage
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;
      console.log('Datos del usuario en editarperfil:', this.usuario);
      this.idUser = user.respuesta.idUsuario;
      console.log(this.idUser, 'Id del usuario en paquetes');
    });
  }

  nuevoPaquete(form: NgForm) {
    this.fecha = this.np.fecha.substring(0, 10);
    let obj = {
      idUsuario: this.idUsuario,
      tipoPago: this.tipoPago,
      tipoInscripcion: this.tipoIns,
      fechaInicio: this.fecha,
      comentario: this.np.comentario,
      sociedad: this.sociedad,
    };
    this.submitted = true;

    if (form.valid) {
      this.servicio
        .setPaquete(obj, this.fecha, this.idUser)
        .subscribe((response: any) => {
          this.mensajeErr = response.mensaje;
          this.mensaje = response.respuesta;
          console.log(response, 'setPaquete Method');

          if (response.codigo == 500) {
            this.asuetoExistente();
          } else {
            this.presentLoading();
            this.clearForm();
          }
        });
      // this.navCtrl.push(ClasesPage)
    } else {
      this.todoslosCampos();
    }
  }

  async asuetoExistente() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajeErr,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: this.mensaje,
      duration: 1200,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.router.navigate(['/perfil']);
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK'],
    });

    await alert.present();
  }

  clearForm() {
    this.np.fecha = '';
    this.np.tipoPago = '';
    this.np.tipoInscripcion = '';
    this.np.comentario = '';
  }

  menuPerfil() {
    this.navCtrl.navigateRoot('/perfil');
  }

  back() {
    this.navCtrl.back();
  }

  public optionsIns(): void {
    console.log('tipo de inscripcion' + this.tipoIns);
  }

  public optionsPago(): void {
    console.log('Tipo de Pago ' + this.tipoPago);
  }

  ngOnInit() {
    this.storage.get('DatosUsuario').then((user) => {
      this.usuarioData = user;
      this.sociedad = this.usuarioData.respuesta.sociedad;
      this.servicio
        .getData(
          this.urlapi +
            'Inscripciones/tipos-inscripcion?sociedad=' +
            this.sociedad
        )
        .subscribe((data) => {
          let objUsEnt = JSON.stringify(data);
          let json = JSON.parse(objUsEnt);
          this.codigo = json.codigo;
          if (this.codigo === 200) {
            console.log(data, 'listado de tipo de inscripciones');
            this.inscripcionesE = data;
            this.inscripciones = this.inscripcionesE.respuesta;
          } else {
            // this.errorCrear();
          }

          // this.loadingInicio();
        });

      this.servicio
        .getData(
          this.urlapi + 'Inscripciones/tipos-pago?sociedad=' + this.sociedad
        )
        .subscribe((data) => {
          let objUsEnt = JSON.stringify(data);
          let json = JSON.parse(objUsEnt);
          this.codigo = json.codigo;
          if (this.codigo === 200) {
            console.log(data, 'listado de tipo de pago');
            this.pagoE = data;
            this.pago = this.pagoE.respuesta;
          } else {
            // this.errorCrear();
          }

          // this.loadingInicio();
        });
    });
  }
}
