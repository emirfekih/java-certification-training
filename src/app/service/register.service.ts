import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable()
export class RegisterService {
  private API_URL= environment.API_URL;
  constructor(private http:Http) { }

  signUp(params){
    return this.http.post(this.API_URL+'/addUser', params)
      .map(response => response);
  };

}
