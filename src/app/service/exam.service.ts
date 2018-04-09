import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Test} from "../model/Test";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ExamService {
  private myobs = Observable.timer(1000,1000);

  constructor(private http:HttpClient) { }

  getExam(examUrl:string){
    return(this.http.get<Test>(examUrl));

  }


}
