import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import { tap } from 'rxjs/operators'
import { delay } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/control_asistencias_api/";  
  httpOptions:any;

  constructor(
    private http:HttpClient
  ) { }

  getData(url:any) {
    return this.http.get(`${url}`);
  }

   // Obterner inscripciones por id

   getInscipciones(idUsuario:any,sociedad:any){
    return this.http.get(this.url + "Inscripciones?idUsuario=" + idUsuario + "&sociedad=" + sociedad,this.httpOptions)
    .pipe(
          delay(1000)
        );
  }

  // Obtener lugares apartados

  getLugares(idClase:any, fechaf:any){
    return this.http.get(this.url + "AsistenciaClases/lugares/" + idClase + "?fecha=" + fechaf ,this.httpOptions)
    .pipe(
          delay(1000)
        );
  }



  // Obternet todos los usuarios

  getUsuarios(){
    return this.http.get(this.url + "Usuarios/",this.httpOptions)
    .pipe(
          delay(1000)
        );
  }

  // Obternet usuario

  getUsuario(idUsuario: any){
    return this.http.get(this.url + 'Usuarios/id_usuario/' + idUsuario,this.httpOptions)
  }

  // Buscar usuarios

  buscarUsuario(){
    return this.http.get<any[]>(this.url + "Usuarios/")    
  }

  // Servicio de editar usuario

  editarUsuario(editar:any) {
    editar = JSON.stringify(editar);
    console.log(editar,"Editar service");
    return this.http.put(this.url + "Usuarios", editar, this.httpOptions);
  }

  // Servicio de editar user (telefono y correo electronico)
  editarUser(editar:any) {
    editar = JSON.stringify(editar);
    console.log(editar,"Editar service");
    return this.http.put(this.url + "Usuarios/actualizar-datos-perfil", editar, this.httpOptions);
  }

  // Servicio cambiar status
  activarUser(idUsuario:any) {
    return this.http.put(this.url + "Usuarios/" + idUsuario + "/1", this.httpOptions);
  }

  // Servicio de desactivar usuario

  desactivarUser(idUsuario:any) {
    return this.http.put(this.url + "Usuarios/" + idUsuario + "/0", this.httpOptions);
  }

  // Servicio bloqueo por pago

  bloquePorPago(idUsuario:any){
    return this.http.put(this.url + "Usuarios/" + "falta-pago/" + idUsuario, this.httpOptions);
  }

  // Servicio de apartar lugar

  // asistenciaAlumno(idClase, idUsuario, fecha) {
  //   return this.http.post(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha, this.httpOptions);
  // }

  // Servicio apartar lugar con imagen

  asistenciaAlumno(idClase:any, idUsuario:any, fecha:any, lugarSeleccionado:any) {
    console.log("Servicio asistencia alumnos por lugar");
    return this.http.post(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha + "&lugar=" + lugarSeleccionado, this.httpOptions);   
  }

  eliminarAsistenciaAlumno(idClase:any, idUsuario:any, fecha:any) {
    console.log("Servicio asistencia alumnos por lugar");
    return this.http.delete(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha , this.httpOptions);   
  }


  agregarListaEspera(idClase:any, idUsuario:any, fecha:any) {
    console.log("Servicio listaEspera");
    return this.http.post(this.url + "lista-espera/" + idClase + "/" + idUsuario + '?fecha=' + fecha , this.httpOptions);   
  }

  eliminarListaEspera(idClase:any, idUsuario:any, fecha:any) {
    console.log("Servicio listaEspera");
    return this.http.delete(this.url + "lista-espera/" + idClase + "/" + idUsuario + '?fecha=' + fecha , this.httpOptions);   
  }

  // Usuario bloqueado por pago

  // expulsarXpago(idUsuario){
  //   console.log("Servicio Expulsar por pago", idUsuario);
  //   return this.http.get(this.url + "Usuarios/bloqueo-por-pago/"+idUsuario,this.httpOptions);
  // }


  // Servicio eliminar asistencia

  eliminarAlumno(idUsuario:any, idClase:any, fecha:any) {
    return this.http.delete(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha, this.httpOptions);
  }

  // Servicio eliminar asueto por fecha

  deleteAsueto(fecha:any){
    return this.http.delete(this.url + 'Asuetos?fecha=' + fecha ,this.httpOptions);
  }

  // Servicio eliminar asueto por idAsueto

  deleteAsuetoXfecha(fecha:any){
    return this.http.delete(this.url + 'Asuetos?fecha=' + fecha ,this.httpOptions);
  }

  // Servicio crear nuevo usuario

  setCrear(clase:any) {
    clase = JSON.stringify(clase);
    console.log(clase);
    return this.http.post(this.url + 'Usuarios/', clase, this.httpOptions)
  }

  // Servicio nuevo paquete

  setPaquete(paquete:any,fecha:any,idUser:any) {
    paquete = JSON.stringify(paquete);
    console.log(paquete);
    return this.http.post(this.url + 'Inscripciones?fecha='+fecha+"&idUsuario="+idUser, paquete, this.httpOptions)
  }


  // Servicio crear nuevo asueto

  setNasueto(asueto:any) {
    asueto = JSON.stringify(asueto);
    console.log(asueto);
    return this.http.post(this.url + 'Asuetos', asueto, this.httpOptions)
  }

  // Editar password (usuario)

  cambiarPass(pass:any) {
    pass = JSON.stringify(pass);
    console.log(pass);
    return this.http.put(this.url + "Usuarios/cambio-contrasenia/", pass, this.httpOptions);
  }

  // Recuperar Pass

  // recuperarPass(pass) {
  //   pass = JSON.stringify(pass);
  //   console.log(pass);
  //   return this.http.put(this.url + "Usuarios/", pass, this.httpOptions);
  // }


  // Servicio crear clase

  setNuevaclase(nClase:any) {
    nClase = JSON.stringify(nClase);
    console.log(nClase);
    return this.http.post(this.url + 'Clases',nClase, this.httpOptions)
  }

  // Editar Clase

  editarClase(edit:any) {
    edit = JSON.stringify(edit);
    console.log(edit);
    return this.http.put(this.url + 'Clases',edit, this.httpOptions)
  }

  // Eliminar Clase

  eliminarClase(idClase:any) {
    return this.http.delete(this.url + "Clases/" + idClase, this.httpOptions);
  }

  // Eliminar Asuetos

  //Agregar falta 

  agregarFalta(idUsuario:any,idUser:any,lugar:any,idClase:any,fecha:any,tipo:any){
    return this.http.put(this.url + "Usuarios/multas/"+idUsuario+"?idUsuarioModificante="+idUser+"&funcion="+tipo+"&idClase="+idClase+"&lugar="+lugar+"&fecha="+fecha, this.httpOptions);
  }

  //Eliminar Faltas

  eliminarFaltas(idUsuario:any,idUser:any){
    return this.http.put(this.url + "Usuarios/multas/"+idUsuario+"?idUsuarioModificante="+idUser+"&funcion=E", this.httpOptions);
  }

  //Eliminar Faltas

  ajustarFalta(idUsuario:any,idUser:any,tipo:any){
    return this.http.put(this.url + "Usuarios/faltas/"+idUsuario+"?idUsuarioModificante="+idUser+"&funcion="+tipo, this.httpOptions);
  }

  aceptarTerminos(idUsuario: any){
    var url = this.url + "Usuarios/terminos/"+idUsuario;
    return this.http.put(url, this.httpOptions);
  }

  configPostHorasCancelacion(config: any) {
    console.log("config horas cancelacion ");
    return this.http.get(this.url + "Configuraciones/por-identificado/" + config, this.httpOptions);

  }

  loginPost(user: any) {
    console.log(user, "Bienvenido Login Post");
    user = JSON.stringify(user);
    console.log("iNICIAR sESION ",user);
    return this.http.post(this.url + "IniciarSesion/iniciar-sesion" , user, this.httpOptions)

  }
}
