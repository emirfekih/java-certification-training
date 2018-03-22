import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { TipsComponent } from './components/tips/tips.component';
import { LoginComponent } from './components/login/login.component';
import { OcasummaryComponent } from './components/ocasummary/ocasummary.component';
import { OcpComponent } from './components/ocp/ocp.component';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
