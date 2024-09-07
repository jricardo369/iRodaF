import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  listado: any;
  listadoRespuesta: any;
  listadoAnterior: any;
  usuario: any;
  idClase: any;
  filterTerm: any;
  fechaf: any;
  codigo: any;
  idrol: any;
  sociedad: any;

  urlapi = 'http://localhost:8080/control_asistencias_api/';

  textoBuscar = '';

  constructor(
    private storage: Storage,
    private servicio: LoginService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.storage.get('DatosUsuario').then((data) => {
      this.usuario = data;
      this.sociedad = this.usuario.respuesta.sociedad;
      //this.horariosLoading();
      this.servicio
        .getData(this.urlapi + 'Clases?sociedad=' + this.sociedad)
        .subscribe((data) => {
          let objUsuario = JSON.stringify(data);
          let json = JSON.parse(objUsuario);
          this.codigo = json.codigo;
          console.log('Codigo del get', this.codigo);

          if (this.codigo === 200) {
            console.log(data, 'listado de clases');
            this.listadoAnterior = data;
            this.listado = data;
            this.listadoRespuesta = this.listadoAnterior.respuesta;
          } else {
            this.errorClases();
            this.navCtrl.navigateRoot('/admin');
          }
        });
    });
  }

  async horariosLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando clasess',
      // duration: 3000
    });
    await loading.present();
    await loading.dismiss();
  }

  async errorClases() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Error al mostrar las clases',
      buttons: ['OK'],
    });

    await alert.present();
  }

  atras() {
    this.navCtrl.navigateBack('/admin');
  }

  crearclass() {
    this.navCtrl.navigateRoot('/crearclase');
  }

  buscar(event: any) {
    console.log(event);
    this.textoBuscar = event.detail.value;

    if (!this.textoBuscar) {
      return (this.listado.respuesta = this.listadoRespuesta);
    } else {
      this.listado.respuesta = this.listado.respuesta.filter((user: any) => {
        return user.diaDescripcion.includes(this.textoBuscar);
      });
    }
  }
}
