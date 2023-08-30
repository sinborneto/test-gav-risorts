import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/components/routGuard/rout-guard.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'contatos',
    loadChildren: () => import('./pages/contatos/contatos.module').then((m) => m.ContatosModule),
    canActivate: [AuthGuard] // Usando o guarda de rota
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
