import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {

  
  isChecked =  false;
  usuario: any;
  idrol: any;
  idUser: any;
  sociedad: any;
  horasCancelacion: any;

  constructor(
    private servicio: LoginService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    public alertController: AlertController
    
  ) {}

  ngOnInit() {

   
    this.storage.get('DatosUsuario').then((user) => {

      this.usuario = user;
      console.log('Datos del usuario:', this.usuario);
      this.idrol = this.usuario.respuesta.idRol;
      this.idUser = this.usuario.respuesta.idUsuario;
      this.sociedad = this.usuario.respuesta.sociedad;

      console.log(this.idrol, 'Rol de usuario en Menu');
      console.log(this.idUser, 'Id del usuario');

      
    });
    this.servicio.configPostHorasCancelacion('HORAS-PERMITIDAS-CANCELACION').subscribe((response: any) => {
      this.horasCancelacion = response.respuesta[0].valorAbajo;
      console.log('hc:'+this.horasCancelacion);
    });
  }

  aceptar() {
    console.log('ischecke:'+this.isChecked);
    if(this.isChecked){
      //servicio para actualizar que acepto los terminos
      this.servicio.aceptarTerminos(this.idUser).subscribe((response: any) => {
        response.descripcion;
      });
      this.navCtrl.navigateRoot('/admin');
    }else{
      this.errorMsj('Es necesario aceptar los terminos y condiciones para poder continuar');
    }
   
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async errorMsj(msj: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
