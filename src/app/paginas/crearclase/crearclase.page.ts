import { Component, OnInit } from '@angular/core';
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
  selector: 'app-crearclase',
  templateUrl: './crearclase.page.html',
  styleUrls: ['./crearclase.page.scss'],
})
export class CrearclasePage implements OnInit {
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  mensajerror: any;
  mensaje: any;
  idUser: any;
  sociedad: any;
  entrenadoresE: any;
  entrenadores: any;
  idUs: any;
  codigo: any;

  usuario: any;

  nc = {
    nombre: '',
    horaInicio: '',
    horaFin: '',
    horario: '',
    personas: '',
    profesor: '',
    dia: '',
  };

  submitted = false;

  constructor(
    private servicio: LoginService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;

      this.idUser = this.usuario.respuesta.idUsuario;
      this.sociedad = this.usuario.respuesta.sociedad;
      console.log('ID del usuario en crear clase', this.idUser);
      console.log('Sociedad de usuario en crear clase', this.sociedad);
    });
  }

  nuevaClase(form: NgForm) {
    let obj = {
      nombre: this.nc.nombre,
      horaInicio: this.nc.horaInicio,
      horaFin: this.nc.horaFin,
      horario: this.nc.horario,
      personas: this.nc.personas,
      profesor: this.idUs,
      dia: this.nc.dia,
      sociedad: this.sociedad,
    };
    this.submitted = true;

    if (form.valid) {
      this.servicio.setNuevaclase(obj).subscribe((response: any) => {
        this.mensajerror = response.mensaje;
        this.mensaje = response.respuesta;
        if (response.codigo === 200) {
          this.presentLoading();
          this.clearForm();
        } else {
          this.errorCrear();
        }
      });
      console.log(this.nc);
      // this.navCtrl.push(ClasesPage)
    } else {
      this.todoslosCampos();
    }
  }

  // Alerta de error (500)

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK'],
    });

    await alert.present();
  }

  //Alert error al crear la clase

  async errorCrear() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensajerror,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Loading clase creada

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: this.mensaje,
      duration: 700,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    // this.navCtrl.navigateRoot('/horariosadmin/' + this.fechaf)
    this.navCtrl.navigateRoot('/clases');
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {
    this.loadingInicio();

    this.servicio
      .getData(this.urlapi + 'Usuarios/entrenadores?sociedad=1')
      .subscribe((data) => {
        let objUsEnt = JSON.stringify(data);
        let json = JSON.parse(objUsEnt);
        this.codigo = json.codigo;
        console.log('Codigo del get', this.codigo);
        if (this.codigo === 200) {
          console.log(data, 'listado de entrenadores');
          this.entrenadoresE = data;
          this.entrenadores = this.entrenadoresE.respuesta;
        } else {
          this.errorCrear();
        }
        // this.loadingInicio();
      });
  }

  public optionsFn(): void {
    //here item is an object
    console.log(this.idUs);
  }

  async loadingInicio() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando',
      duration: 700,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  atras() {
    this.navCtrl.navigateRoot('/clases');
  }

  clearForm() {
    this.nc.nombre = '';
    this.nc.horaInicio = '';
    this.nc.horaFin = '';
    this.nc.horario = '';
    this.nc.personas = '';
    this.nc.profesor = '';
    this.nc.dia = '';
  }
}
