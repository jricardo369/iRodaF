import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  mensaje: any;
  idUsuario: any;
  msjError: any;
  perfiles: any[] = [];
  textoBuscar:string = '';

  listado: any;
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  constructor(
    private navCtrl: NavController,
    private servicio: LoginService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // this.servicio.getData(this.urlapi + "Usuarios/").subscribe((data) => {
    this.servicio.getUsuarios().subscribe((data) => {
      console.log(data);
      this.listado = data;
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.mensaje = json.descripcion;
      if (json.codigo === 200) {
        // this.loadingController.dismiss();
        console.log('Entro bien');
      } else {
        this.errorCargar();
        this.navCtrl.navigateRoot('/admin');
      }
    });
  }

  activar(idUsuario: any) {
    this.servicio.activarUser(idUsuario).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, 'Usuario Activado');
        this.userActivado();
        this.obtenerDatos();
      } else {
        this.msjError();
      }
    });
  }

  desactivar(idUsuario: any) {
    this.servicio.desactivarUser(idUsuario).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, 'Usuario Desactivado');
        this.userDesactivado();
        this.obtenerDatos();
      } else {
        this.msjError();
      }
    });
  }

  bPago(idUsuario: any) {
    this.servicio.bloquePorPago(idUsuario).subscribe((response: any) => {
      this.mensaje = response.descripcion;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, 'Usuario desactivado por pago');
        this.userDesactivado();
        this.obtenerDatos();
      } else {
        this.msjError();
      }
    });
  }

  menuPerfil() {
    this.navCtrl.navigateRoot('/admin');
  }

  registro() {
    this.navCtrl.navigateRoot('/registro');
  }

  buscar(event: any) {
    console.log(event);
    this.textoBuscar = event.detail.value;
  }

  async errorCargar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

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

  obtenerDatos() {
    this.servicio.getData(this.urlapi + 'Usuarios/').subscribe((data) => {
      this.listado = data;
    });
  }
}
