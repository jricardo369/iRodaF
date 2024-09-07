import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  rp = {
    email: '',
  };

  mensaje: any;
  codigo: any;
  listado: any;
  submitted = false;

  urlapi = 'http://localhost:8080/control_asistencias_api/';

  constructor(
    private navCtrl: NavController,
    private servicio: LoginService,
    private loaginCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  recuperarPass(form: NgForm) {
    let obj = {
      email: this.rp.email,
    };
    this.submitted = true;

    this.servicio
      .getData(this.urlapi + 'Usuarios/' + this.rp.email)
      .subscribe((data) => {
        console.log(data);
        this.listado = data;
        this.codigo = this.listado.codigo;
        this.mensaje = this.listado.descripcion;

        if (this.codigo === 200) {
          this.cambiopassLoading();
          this.navCtrl.navigateRoot('/login');
        } else {
          this.erroPass();
          this.clearForm();
        }
      });
  }

  async cambiopassLoading() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async erroPass() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  clearForm() {
    this.rp.email = '';
  }

  atras() {
    this.navCtrl.navigateRoot('/login');
  }

  ngOnInit() {}
}
