import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { LoginComponent } from './PortfolioView/Pages/login/login.component';
import { DashboardComponent } from './PortfolioView/Pages/dashboard/dashboard.component';
// import { LoginFormComponent } from './PortfolioView/Pages/login-form/login-form.component';


const routes: Routes = [
{
  path:'',
  component : LoginComponent,
  canActivate:[AuthGuard]
},

{
  path:'dashboard',
  component : DashboardComponent,
  canActivate:[AuthGuard]
},
// {
//   path:'',
//   component : LoginFormComponent,
//   canActivate:[AuthGuard]
// }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
