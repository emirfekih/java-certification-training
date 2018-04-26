import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Test} from "../model/Test";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Config} from "../model/Config";

@Injectable()
export class ExamService {

  private messageSource = new BehaviorSubject<Config>(new Config());
  currentMessage = this.messageSource.asObservable();

  constructor(private http:HttpClient) {

  }

  getExam(examUrl:string){
    return(this.http.get<Test>(examUrl));

  }

  changeMessage(configTest: Config) {
    this.messageSource.next(configTest)
  }



}
