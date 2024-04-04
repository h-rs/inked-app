import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
