import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { ListaComponent } from './usuarios/lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: ListaComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
