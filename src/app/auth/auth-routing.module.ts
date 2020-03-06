import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
//   {
//   path: 'login',
//   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
// },
{ path: '', loadChildren: './pages/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
