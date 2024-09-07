import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  NavParams,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
// import { CalendarComponentOptions } from "ion2-calendar";

@Component({
  selector: 'app-caladmin',
  templateUrl: './caladmin.page.html',
  styleUrls: ['./caladmin.page.scss'],
})
export class CaladminPage implements OnInit {
  date: any;
  fechacal: any;
  fechaf: any;
  fecha: any;
  idUser: any;
  sociedad: any;
  idRol: any;

  usuario: any;

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
    private navParams: NavParams,
    private loadingController: LoadingController
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;
      console.log('Datos del usuario en caladmin:', this.usuario);
      this.idUser = this.usuario.respuesta.idUsuario;
      this.sociedad = this.usuario.respuesta.sociedad;
      this.idRol = this.usuario.respuesta.idRol;
      console.log('ID del usuario en caladmin', this.idUser);
    });
  }

  ngOnInit() {
    this.loadingInicio();
  }

  fechaSeleccionada(date: any) {
    this.fechaf = this.date.substring(0, 10);

    console.log('cambios pendientes');

    console.log('Click en fecha ', this.fechaf);

    this.navCtrl.navigateRoot(
      '/horariosadmin/' +
        this.fechaf +
        '/' +
        this.idUser +
        '/' +
        this.sociedad +
        '/' +
        this.idRol
    );
  }

  onClick(date: any, fechaf: string) {
    this.fechacal = this.date.substring(0, 10);

    this.navCtrl.navigateRoot(
      '/horariosadmin/' +
        fechaf +
        '/' +
        this.idUser +
        '/' +
        this.sociedad +
        '/' +
        this.idRol
    );
    console.log(fechaf);
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
}
