import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavParams,
  ToastController,
} from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  idUser: any;
  sociedad: any;
  usuario: any;

  nu = {
    rol: '',
    usuario: '',
    contrasenia: '',
    nombre: '',
    sexo: '',
    correo_electronico: '',
    peso: '',
    altura: '--',
    imc: '--',
    telefono: '',
    nivel: '',
    estatus: '',
    intentos: '',
  };

  submitted = false;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private servicio: LoginService,
    public loadingController: LoadingController,
    public http: HttpClient,
    public alertController: AlertController,
    private navParams: NavParams,
    private storage: Storage
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;
      console.log('Datos del usuario en registro:', this.usuario);
      this.idUser = this.usuario.respuesta.idUsuario;
      this.sociedad = this.usuario.respuesta.sociedad;
      console.log('ID del usuario en registro', this.idUser);
      console.log('Sociedad de usuario en registro', this.sociedad);
    });
  }

  // Agregar nuevo usuario
  nuevoUsuario(form: NgForm) {
    let obj = {
      // "idUsuario":null,
      idRol: this.nu.rol,
      usuario: this.nu.usuario,
      contrasenia: this.nu.contrasenia,
      nombre: this.nu.nombre,
      sexo: this.nu.sexo,
      correoElectronico: this.nu.correo_electronico,
      peso: 0,
      altura: 0,
      imc: '--',
      telefono: this.nu.telefono,
      nivel: '10',
      estatus: 1,
      intentos: 0,
      sociedad: this.sociedad,
    };

    this.submitted = true;

    if (form.valid) {
      this.servicio.setCrear(obj).subscribe((response: any) => {
        console.log(response, 'SetCrear Method');

        if (response.codigo == 500) {
          this.usuarioExistente();
        } else {
          this.presentLoading();
          this.clearForm();
        }
      });
      console.log(this.nu);
      // this.navCtrl.push(ClasesPage)
    } else {
      this.todoslosCampos();
    }
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Agregando usuario',
      duration: 1200,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.router.navigate(['/perfil']);
  }

  async usuarioExistente() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Usuario ya registrado',
      duration: 700,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.router.navigate(['/registro']);
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK'],
    });

    await alert.present();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {
    this.loadingInicio();
  }

  clearForm() {
    this.nu.rol = '';
    this.nu.usuario = '';
    this.nu.contrasenia = '';
    this.nu.nombre = '';
    this.nu.sexo = '';
    this.nu.correo_electronico = '';
    this.nu.peso = '';
    this.nu.altura = '';
    this.nu.imc = '';
    this.nu.telefono = '';
    this.nu.nivel = '';
    this.nu.estatus = '';
    this.nu.intentos = '';
  }
}
