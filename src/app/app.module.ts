import { RegisterService } from './service/register.service';
import { AuthService } from './service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { TipsComponent } from './components/tips/tips.component';
import { LoginComponent } from './components/login/login.component';
import { OcasummaryComponent } from './components/ocasummary/ocasummary.component';
import { OcpComponent } from './components/ocp/ocp.component';
import {ChapterService} from "./service/chapter.service";
import {HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { ExamComponent } from './components/exam/exam.component';
import {ExamService} from "./service/exam.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {TimerService} from "./service/timer.service";
import { ResultComponent } from './result/result.component';
import {NgCircleProgressModule} from "ng-circle-progress";
import {ChartModule} from 'primeng/components/chart/chart';

import {TokenInterceptor} from "./service/token.interceptor";




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    TipsComponent,
    LoginComponent,
    OcasummaryComponent,
    OcpComponent,
    ExamComponent,
    SignUpComponent,
    ResultComponent,






  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule,
    NgCircleProgressModule,
    ChartModule
  ],
  providers: [
    ChapterService,ExamService,AuthService,RegisterService,TimerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
