import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editarclase',
  templateUrl: './editarclase.page.html',
  styleUrls: ['./editarclase.page.scss'],
})
export class EditarclasePage implements OnInit {

  
  urlapi = "http://localhost:8080/control_asistencias_api/";

  usuario: any;
  numeroUsuario: any;
  idClase: any;
  mensaje: any;
  msjC: any;
  fechaf: any;
  horaFin: any;
  horaInicio: any;
  horario: any;
  nombre: any;
  dia: any;
  profesor: any ;
  personas: any;
  estatus: any;
  codigo: any;
  entrenadoresE: any;
  entrenadores: any;
  idUs: any;
  sociedad: any;

  constructor(
    private servicio: LoginService,
    private storage: Storage,
    private navParams: NavParams,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    // private loadingController: LoadingController,
    private router: Router,
    private navCtrl: NavController,
    private loadingController: LoadingController

  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("DatosUsuario").then((user) => {
      this.usuario = user;
      console.log("Datos del usuario STORAGE:", this.usuario);
      this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');

      console.log("Id de la clase a editar", this.idClase);
      console.log("Nombre de la clase", this.nombre);

    });
  }

  ionViewWillEnter() {

    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.horaInicio = this.activatedRoute.snapshot.paramMap.get('horaInicio');
    this.horaFin = this.activatedRoute.snapshot.paramMap.get('horaFin');
    this.horario = this.activatedRoute.snapshot.paramMap.get('horario');
    this.profesor = this.activatedRoute.snapshot.paramMap.get('profesor');
    this.personas = this.activatedRoute.snapshot.paramMap.get('personas');
    this.estatus = this.activatedRoute.snapshot.paramMap.get('estatus');
    this.dia = this.activatedRoute.snapshot.paramMap.get('dia');

  }

  ngOnInit() {
    this.loadingInicio();
    this.storage.get("DatosUsuario").then((user) => {
      this.usuario = user;
      this.sociedad = this.usuario.respuesta.sociedad;

      this.servicio.getData(this.urlapi + 'Usuarios/entrenadores?sociedad='+this.sociedad).subscribe(data => {
        let p = parseInt(this.profesor);
        this.idUs = p;
        let objUsEnt = JSON.stringify(data);
        let json = JSON.parse(objUsEnt);
        this.codigo = json.codigo;
        console.log("Codigo del get", this.codigo);
        if (this.codigo === 200) {
          console.log(data, "listado de entrenadores");
          this.entrenadoresE = data;
          this.entrenadores = this.entrenadoresE.respuesta;
  
        } else {
          this.errorEditar();
        }  
      });
      
    });   

  }

  ec = {
    "idClase": "",
    "nombre": "",
    "horaInicio": "",
    "horaFin": "",
    "horario": "",
    "personas": "",
    "profesor": "",
    "estatus": "",
    "dia": ""
  }
  submitted = false;

  public optionsFn(): void { //here item is an object 
    console.log(this.idUs);
  }

  editarClass(form: NgForm) {

    console.log("ID de la clase editada", this.idClase);
    console.log("ID de la clase editada", this.idUs);

    let obj = {
      "idClase": this.idClase,
      "nombre": this.ec.nombre || this.nombre,
      "horaInicio": this.ec.horaInicio ||this.horaInicio,
      "horaFin": this.ec.horaFin ||this.horaFin,
      "horario": this.ec.horario || this.horario,
      "personas": this.ec.personas || this.personas,
      "profesor": this.idUs || this.profesor,
      "estatus": this.ec.estatus || this.estatus,
      "dia": this.ec.dia || this.dia,
      "sociedad": this.sociedad
    }

    this.submitted = true;

    if (form.valid) {

      this.servicio.editarClase(obj).subscribe((response: any) => {
        this.mensaje = response.mensaje;
        this.msjC = response.respuesta;
        console.log(response, "Editar clase Method ");

        if (response.codigo === 200) {
          this.editadaCorrect();
          this.navCtrl.navigateRoot('/clases')
          // this.navCtrl.navigateRoot('/horariosadmin/' + this.fechaf)
          // console.log("Fecha de clase editada", this.fechaf);
        } else {
          this.errorEditar();
        }
      });
      console.log(this.ec);
      // this.navCtrl.push(ClasesPage)

    } else {
      this.todoslosCampos();
    }
  }

  // Eliminar Clase

  eliminarClase() {

    this.presentAlertConfirm();
  }

  classeliminar() {
    this.servicio.eliminarClase(this.idClase).subscribe((response: any) => {
      console.log(response, "Clase Eliminada");

      this.mensaje = response.respuesta;

      if (response.codigo == 200) {
        this.deleteClase();
        console.log("ID de clase eliminada", this.idClase);
        this.navCtrl.navigateRoot('/clases')

      } else {
        this.deleteClase();
      }
    });
  }

  async loadingInicio() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: "Cargando",
      duration: 700
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async deleteClase() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorEditar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  async editadaCorrect() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.msjC,
      buttons: ['OK']
    });

    await alert.present();
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async presentAlertConfirm() {

    console.log("Seguro que desea eliminar la clase");
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: "Seguro que desea eliminar la clase",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.classeliminar();
          }
        }
      ]
    });
    await alert.present();
  }

  atras() {
    // this.navCtrl.navigateRoot('/horariosadmin/'+ this.fechaf)
    this.navCtrl.navigateRoot('/clases')
  }

}
