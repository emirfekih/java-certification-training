import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ExamhistoryService {
  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) {

  }

  getExamHistory(userId:number){
    return this.http.get(this.API_URL+"/usertests/"+userId)
  }


}
