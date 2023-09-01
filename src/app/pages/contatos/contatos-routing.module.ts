import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos.component';
import { CriarContatoComponent } from './criar-contato/criar-contato.component';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';


const routes: Routes = [
  { path: '', component: ContatosComponent },
  { path: 'novo', component: CriarContatoComponent },
  { path: 'editar', component: EditarContatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatosRoutingModule {}