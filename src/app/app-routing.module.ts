import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { LoginComponent } from './PortfolioView/Pages/login/login.component';
import { DashboardComponent } from './PortfolioView/Pages/dashboard/dashboard.component';


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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
