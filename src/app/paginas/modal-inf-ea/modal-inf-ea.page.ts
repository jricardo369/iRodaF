import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-inf-ea',
  templateUrl: './modal-inf-ea.page.html',
  styleUrls: ['./modal-inf-ea.page.scss'],
})
export class ModalInfEaPage implements OnInit {
  fecha: any;
  mensajerr: any;

  ea = {
    fecha: '',
  };

  submitted = false;

  constructor(
    private modalCtrl: ModalController,
    private servicio: LoginService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  eliminarXfecha(form: NgForm) {
    this.fecha = this.ea.fecha.substring(0, 10);

    this.submitted = true;

    if (form.valid) {
      console.log(this.fecha + 'Fecha a Eliminar');

      this.servicio
        .deleteAsuetoXfecha(this.fecha)
        .subscribe((response: any) => {
          this.mensajerr = response.mensaje;
          if (response.codigo === 200) {
            // this.presentAlertConfirm();
            this.deleteAsueto();
            this.modalCtrl.dismiss();
            this.navCtrl.navigateRoot('/admin');
          } else {
            this.errorEliminar();
          }
          console.log(response, 'Eliminar Asueto x fecha');
        });
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async presentAlertConfirm(eXfecha: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Desea eliminar todos los asuetos de este dia ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton de cancelar');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.eliminarXfecha(eXfecha);
            this.deleteAsueto();
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteAsueto() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Asueto(s) eliminado(s)',
      duration: 1000,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async errorEliminar() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensajerr,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
