import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {TipsComponent} from "./components/tips/tips.component";
import {OcasummaryComponent} from "./components/ocasummary/ocasummary.component";
import {OcpComponent} from "./components/ocp/ocp.component";
import {ExamComponent} from "./components/exam/exam.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: 'login', component:LoginComponent},
  { path: 'tips',component:TipsComponent },
  { path: 'oca',component:OcasummaryComponent },
  {path:'ocp',component:OcpComponent},
  {path:'exam',component:ExamComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
