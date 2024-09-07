import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nuevoasueto',
  templateUrl: './nuevoasueto.page.html',
  styleUrls: ['./nuevoasueto.page.scss'],
})
export class NuevoasuetoPage implements OnInit {

  
  urlapi = "http://localhost:8080/control_asistencias_api/";

  fecha:any;
  mensaje: any;
  mensajeErr: any;
  usuario: any;
  sociedad: any;
  codigo: any;
  clasesE: any;
  clases: any;
  idClase: any;

  na = {
    "fecha": "",
    "idClase": "",
    "tipo":""
  }

  submitted = false;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private servicio: LoginService,
    private router: Router,
    private storage: Storage,
  ) { }

  nuevoAsueto(form: NgForm) {

    this.fecha = this.na.fecha.substring(0, 10);

    let obj = {
      "fecha": this.fecha,
      "idClase": this.idClase,
      "tipo":this.na.tipo,
      "sociedad":this.sociedad
    }
    this.submitted = true;

    if (form.valid) {

      this.servicio.setNasueto(obj).subscribe((response: any) => {
        this.mensajeErr = response.mensaje;
        this.mensaje = response.respuesta;
        console.log(response, "setNasueto Method");

        if (response.codigo == 500) {
          this.asuetoExistente()
        } else {
          this.presentLoading();
          this.clearForm();
        }
      });
      // this.navCtrl.push(ClasesPage)

    } else {
      this.todoslosCampos()
    }
  } 

  ngOnInit() {
    this.loadingInicio();
    this.storage.get("DatosUsuario").then((user) => {
      this.usuario = user;
      this.sociedad = this.usuario.respuesta.sociedad;

      this.servicio.getData(this.urlapi + 'Clases?sociedad='+this.sociedad).subscribe(data => {
        
        let objUsEnt = JSON.stringify(data);
        let json = JSON.parse(objUsEnt);
        this.codigo = json.codigo;
        console.log("Codigo del get", this.codigo);
        if (this.codigo === 200) {
          console.log(data, "listado de entrenadores");
          this.clasesE = data;
          this.clases = this.clasesE.respuesta;
  
        } else {
          this.mensaje = "Error al crear el asueto";
          this.errorCrear();
        }
      });
      
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

  atras() {
    this.navCtrl.navigateRoot('/asuetos');
  }

  async asuetoExistente() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajeErr,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: this.mensaje,
      duration: 1200,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.router.navigate(['/asuetos']);
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }

  clearForm(){
    this.na.fecha = "";
    this.na.idClase = "";
    this.na.tipo = "";
  }

  async errorCrear() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
