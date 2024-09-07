import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NavParams,
  LoadingController,
  NavController,
  AlertController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-horariosadmin',
  templateUrl: './horariosadmin.page.html',
  styleUrls: ['./horariosadmin.page.scss'],
})
export class HorariosadminPage implements OnInit {
  listado: any;
  usuario: any;
  idClase: any;
  fechaf: any;
  codigo: any;
  idrol: any;
  idEntrenador: any;
  bloq: any;
  idUser: any;
  sociedad: any;
  nombreProf: any;
  estatus: any;
  numeroProfesor: any;
  rolId: any;

  urlapi = 'http://localhost:8080/control_asistencias_api/';

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navParams: NavParams,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;
    });
  }

  ngOnInit() {
    this.horariosLoading();
    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    this.idUser = this.activatedRoute.snapshot.paramMap.get('idUser');
    this.rolId = this.activatedRoute.snapshot.paramMap.get('idRol');
    this.sociedad = this.activatedRoute.snapshot.paramMap.get('sociedad');
    console.log('idrol:' + this.rolId);

    if (this.rolId == 3) {
      this.servicio
        .getData(
          this.urlapi +
            'Clases' +
            '/por-fecha/profesor/' +
            this.fechaf +
            '/' +
            this.idUser +
            '?sociedad=' +
            this.sociedad
        )
        .subscribe((data) => {
          let objUsuario = JSON.stringify(data);
          let json = JSON.parse(objUsuario);
          this.codigo = json.codigo;
          console.log(objUsuario, 'objUsuario');

          if (this.codigo === 200) {
            console.log(data, 'listado de clases');
            this.loadingController.dismiss();
            this.listado = data;
            console.log(this.fechaf, 'fecha del ngoninit');
          } else {
            this.errorClases();
            this.navCtrl.navigateRoot('/caladmin');
          }
        });
    }

    if (this.rolId == 1) {
      this.servicio
        .getData(
          this.urlapi +
            'Clases/activas-para-admin/' +
            this.fechaf +
            '?sociedad=' +
            this.sociedad
        )
        .subscribe((data) => {
          let objUsuario = JSON.stringify(data);
          let json = JSON.parse(objUsuario);
          this.codigo = json.codigo;
          //console.log(objUsuario, "objUsuario");

          if (this.codigo === 200) {
            console.log(data, 'listado de clases');
            this.loadingController.dismiss();
            this.listado = data;
            console.log(this.fechaf, 'fecha del ngoninit');
          } else {
            this.errorClases();
            this.navCtrl.navigateRoot('/caladmin');
          }
        });
    }
  }

  atras() {
    this.navCtrl.navigateBack('/caladmin');
  }

  async horariosLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando clases',
    });
    await loading.present();
    // const { role, data } = await loading.onDidDismiss();
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
}
