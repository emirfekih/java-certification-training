import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Test} from "../model/Test";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Config} from "../model/Config";
import {AuthService} from "./auth.service";
import {RequestOptions} from "@angular/http";
import {headersToString} from "selenium-webdriver/http";
import {environment} from "../../environments/environment";

@Injectable()
export class ExamService {

  private API_URL= environment.API_URL;


  private messageSource = new BehaviorSubject<Config>(new Config());
  currentMessage = this.messageSource.asObservable();

  constructor(private http:HttpClient,private authService:AuthService) {

  }

  getExam(examUrl:string){

    return(this.http.get<Test>(examUrl));

  }

  getTestByType(type:string){
    return(this.http.get<Test[]>(this.API_URL+'/test?testType='+type));
  }


  changeMessage(configTest: Config) {
    this.messageSource.next(configTest)
  }



}
