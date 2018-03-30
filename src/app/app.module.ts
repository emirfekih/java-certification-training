import { AuthService } from './service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import {HttpClientModule} from "@angular/common/http";
import { ExamComponent } from './components/exam/exam.component';
import {ExamService} from "./service/exam.service";

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



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ChapterService,ExamService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
