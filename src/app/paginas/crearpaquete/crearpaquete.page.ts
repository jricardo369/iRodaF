import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-crearpaquete',
  templateUrl: './crearpaquete.page.html',
  styleUrls: ['./crearpaquete.page.scss'],
})
export class CrearpaquetePage implements OnInit {
  listado: any;
  mensaje: any;
  submitted = false;
  idUsuario: any;
  sociedad: any;
  idRol: any;

  constructor(
    private navCtrl: NavController,
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('idUsuario');
    this.sociedad = this.activatedRoute.snapshot.paramMap.get('sociedad');
    this.idRol = this.activatedRoute.snapshot.paramMap.get('idRol');
    console.log(this.idUsuario, 'idusuario ngoninit');

    this.servicio
      .getInscipciones(this.idUsuario, this.sociedad)
      .subscribe((data) => {
        console.log(data);
        let objUsuario = JSON.stringify(data);
        let json = JSON.parse(objUsuario);
        this.mensaje = json.descripcion;
        if (json.codigo === 200) {
          console.log('Mostrar inscripciones');
          this.listado = data;
          console.log('listado ', this.listado);
        } else {
          // this.errorCargar();
          // this.navCtrl.navigateRoot('/admin');
        }
      });
  }

  agregarPaquete() {
    this.navCtrl.navigateRoot(
      '/paquetes/' + this.idUsuario + '/' + this.sociedad
    );
    console.log('Agregar Paquete');
  }

  back() {
    this.navCtrl.back();
  }
}
