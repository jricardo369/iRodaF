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
  selector: 'app-asistenciasusuario',
  templateUrl: './asistenciasusuario.page.html',
  styleUrls: ['./asistenciasusuario.page.scss'],
})
export class AsistenciasusuarioPage implements OnInit {

  listado: any;
  usuario: any;
  codigo: any;
  idrol: any;
  fechaf: any;
  numeroUsuario: any;
  mensaje: any;
  estatus: any;
  idUsuario: any;
  mensajeerror: any;
  urlapi = 'http://localhost:8080/control_asistencias_api/';

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navParams: NavParams,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) { 

    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;
      this.idrol = this.usuario.respuesta.idRol;
      console.log('El rol del usuario logeado:' + this.idrol);
      console.log('El usuario en HORARIO es :', this.usuario.respuesta.nombre);
      console.log('Y su Rol es :', this.usuario.respuesta.idRol);
      console.log('El ID del usuario es  :', this.usuario.respuesta.idUsuario);
      this.numeroUsuario = this.usuario.respuesta.idUsuario;

      this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
      this.idUsuario;

      // this.horariosLoading();

      this.servicio
        .getData(
          this.urlapi +
            'AsistenciaClases' +
            '/asistencias-usuario'+
            '/' +
            this.numeroUsuario
        )
        .subscribe((data) => {
          console.log(data, 'listado de clases');

          let objUsuario = JSON.stringify(data);
          let json = JSON.parse(objUsuario);
          this.codigo = json.codigo;
          console.log('Codigo del get', this.codigo);

          if (this.codigo === 200) {
            // this.quitLoading();
          } else {
            this.errorQuitar();
            this.navCtrl.navigateRoot('/calalumno');
          }
          this.listado = data;
          console.log(this.fechaf, 'fecha del constructor');
        });
    });  
  

  }

  ngOnInit() {
  }

  atras() {
    this.navCtrl.navigateRoot('/user');
  }

  quitLoading() {
    this.loadingController.dismiss();
  }

  async errorQuitar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajeerror,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
