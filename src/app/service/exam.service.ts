import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Test} from "../model/Test";

@Injectable()
export class ExamService {

  constructor(private http:HttpClient) { }

  getExam(examUrl:string){
    return(this.http.get<Test>(examUrl));

  }
}
