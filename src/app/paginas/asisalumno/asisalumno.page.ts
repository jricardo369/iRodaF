import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-asisalumno',
  templateUrl: './asisalumno.page.html',
  styleUrls: ['./asisalumno.page.scss'],
})
export class AsisalumnoPage implements OnInit {

  
  fechaClase: Date = new Date();

  fa = {
    "fecha": ""
  }

  mensaje: any;
  idClase: any;
  listado: any;
  idUsuario: any;
  nombre: any;
  profesor: any;
  usuario: any;
  numeroUsuario: any;
  fechaDeClase: any;
  fecha: any;
  mensajeerror: any;

  urlapi = "http://localhost:8080/control_asistencias_api/"

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private storage: Storage,
    private navParams: NavParams,

  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("DatosUsuario").then((user) => {
      this.usuario = user;

      console.log("El usuario en ASISTENCIA ALUMNO es :", this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      this.numeroUsuario = this.usuario.respuesta.idUsuario;
      console.log("La fecha es :", this.fechaDeClase);

    });
  }

  ionViewWillEnter() {

    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('idUsuario');
    this.usuario = this.activatedRoute.snapshot.paramMap.get('usuario');

    this.servicio.getData(this.urlapi + 'Usuarios/usuario/' + this.usuario + '/').subscribe(data => {

      console.log(data);

      this.listado = data;

    });
  }

  asistir(idUser:any, idClase:any) {

    console.log('fecha in:' + this.fecha);
    if (this.fecha === undefined) {
      console.log('entro');
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.fecha = yyyy + "-" + mm + "-" + dd;
    }
    console.log('fecha f:' + this.fecha);

    // this.servicio.asistenciaAlumno(this.idClase, this.numeroUsuario, this.fecha).subscribe((response: any) => {
    //   console.log(response, "Asistencia apartada");
    //   this.mensaje = response.respuesta;
    //   this.mensajeerror = response.descripcion;
    //   console.log(this.fechaDeClase, "Fecha clase");
    //   if (response.codigo == 200) {

    //     this.agregadoAlert();
    //     console.log("Fecha seleccionada", this.fechaDeClase);

    //   } else {
    //     this.usuarioEnclase();
    //   }
    // });
    console.log("Fecha seleccionada", this.fecha);
  }

  quitarAsistencia(idUser:any) {

    console.log('fecha in:' + this.fecha);
    if (this.fecha === undefined) {
      console.log('entro');
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.fecha = yyyy + "-" + mm + "-" + dd;
    }
    console.log('fecha f:' + this.fecha);

    this.servicio.eliminarAlumno(this.numeroUsuario, this.idClase, this.fecha).subscribe((response: any) => {
      console.log(response, "Asistencia eliminada");

      this.mensaje = response.respuesta;

      if (response.codigo == 200) {

        this.eliminarAsistencia();
        console.log("Fecha seleccionada", this.fecha);
      } else {
        this.eliminarAsistencia();
      }
    });
  }

  // Inicio de alertas

  // Agregado correctamente

  async agregadoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Error al agregar

  async usuarioEnclase() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajeerror,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Eliminar Asistenca

  async eliminarAsistencia() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Fin de Alertas


  async activandoLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: this.mensaje,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async asistenciaEliminada() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: this.mensaje,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  ngOnInit() {

    this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.profesor = this.activatedRoute.snapshot.paramMap.get('profesor');

    console.log("El ID de la clase es :", this.idClase);

    this.servicio.getData('http://localhost:8080/control_asistencias_api/AsistenciaClases/' + this.idClase + '/').subscribe(data => {
      console.log(data, "ngOnInit");
      this.listado = data;

      // Convertir data en JSON
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.fechaDeClase = json.respuesta.fecha;
      console.log("Fecha de la clase", this.fechaDeClase);
    });
  }

  cambiofecha(filtro:any) {

    this.fecha = this.fa.fecha.substring(0, 10);

    this.servicio.getData('http://localhost:8080/control_asistencias_api/AsistenciaClases/' + this.idClase + '?fecha=' + this.fecha).subscribe(data => {
      console.log(data, "cambioFecha");
      this.listado = data;
    });

    console.log(event, "evento");

    console.log(this.fecha, "fecha seleccionada");

    console.log("La fecha seleccionada por el alumno es:", this.fechaDeClase);

  }
}
