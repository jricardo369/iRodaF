import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./paginas/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./paginas/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'caladmin',
    loadChildren: () => import('./paginas/caladmin/caladmin.module').then( m => m.CaladminPageModule)
  },
  {
    path: 'paquetes/:idUsuario/:sociedad',
    loadChildren: () => import('./paginas/paquetes/paquetes.module').then( m => m.PaquetesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./paginas/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'calalumno',
    loadChildren: () => import('./paginas/calalumno/calalumno.module').then( m => m.CalalumnoPageModule)
  },
  {
    path: 'clases',
    loadChildren: () => import('./paginas/clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'asuetos',
    loadChildren: () => import('./paginas/asuetos/asuetos.module').then( m => m.AsuetosPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'crearclase',
    loadChildren: () => import('./paginas/crearclase/crearclase.module').then( m => m.CrearclasePageModule)
  },
  {
    path: 'editarperfil/:idUsuario/:idRol/:usuario/:sexo/:correoElectronico/:nombre/:telefono/:contrasenia/:estatus/:totalMultas',
    loadChildren: () => import('./paginas/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
  },
  {
    path: 'editarclase/:idClase/:horaInicio/:horaFin/:horario/:nombre/:profesor/:personas/:estatus/:dia',
    loadChildren: () => import('./paginas/editarclase/editarclase.module').then( m => m.EditarclasePageModule)
  },
  {
    path: 'nuevoasueto',
    loadChildren: () => import('./paginas/nuevoasueto/nuevoasueto.module').then( m => m.NuevoasuetoPageModule)
  },
  {
    path: 'crearpaquete/:idUsuario/:sociedad/:idRol',
    loadChildren: () => import('./paginas/crearpaquete/crearpaquete.module').then( m => m.CrearpaquetePageModule)
  },
  {
    path: 'cambiarpass',
    loadChildren: () => import('./paginas/cambiarpass/cambiarpass.module').then( m => m.CambiarpassPageModule)
  },
  {
    path: 'clasesalumnos',
    loadChildren: () => import('./paginas/clasesalumnos/clasesalumnos.module').then( m => m.ClasesalumnosPageModule)
  },
  {
    path: 'asisalumno',
    loadChildren: () => import('./paginas/asisalumno/asisalumno.module').then( m => m.AsisalumnoPageModule)
  },
  {
    path: 'asistentes/:idClase/:nombre/:profesor/:fechaf/:profesorNombre/:descripcionHorario',
    loadChildren: () => import('./paginas/asistentes/asistentes.module').then( m => m.AsistentesPageModule)
  },
  {
    path: 'horarios/:fechaf',
    loadChildren: () => import('./paginas/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'horariosadmin/:fechaf/:idUser/:sociedad/:idRol',
    loadChildren: () => import('./paginas/horariosadmin/horariosadmin.module').then( m => m.HorariosadminPageModule)
  },
  {
    path: 'lugares/:fechaf/:descripcionHorario/:idClase/:asistencia/:lugar/:claseLlena/:isListaEspera',
    loadChildren: () => import('./paginas/lugares/lugares.module').then( m => m.LugaresPageModule)
  },
  {
    path: 'modal-inf-ea',
    loadChildren: () => import('./paginas/modal-inf-ea/modal-inf-ea.module').then( m => m.ModalInfEaPageModule)
  },
  {
    path: 'asistenciasusuario',
    loadChildren: () => import('./asistenciasusuario/asistenciasusuario.module').then( m => m.AsistenciasusuarioPageModule)
  },
  {
    path: 'terminos',
    loadChildren: () => import('./paginas/terminos/terminos.module').then( m => m.TerminosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
