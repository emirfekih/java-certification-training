import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Test} from "../model/Test";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Config} from "../model/Config";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {UserTest} from "../model/UserTest";





@Injectable()
export class ExamService {

  private API_URL= environment.API_URL;
  private httpOptions=environment.httpOptions;


  private messageSource = new BehaviorSubject<Config>(new Config());
  currentMessage = this.messageSource.asObservable();




  constructor(private http:HttpClient,private authService:AuthService) {

  }

  getExam(examUrl:string):Observable<Test>{

    return(this.http.get<Test>(examUrl));

  }

  getTestByType(type:string):Observable<Test[]>{
    return(this.http.get<Test[]>(this.API_URL+'/test?testType='+type));
  }


  changeMessage(configTest: Config) {
    this.messageSource.next(configTest)
  }

  addUserExam(data:any):Observable<any> {
    return(this.http.post<any>(this.API_URL+'/addUserTest',data,this.httpOptions));

  }
  getCurrentUser():Observable<any>{
    return this.http.get(this.API_URL+'/user');
  }
  getCurrentUserId():Observable<number>{
    return this.http.get<number>(this.API_URL+'/userId');
  }




}
