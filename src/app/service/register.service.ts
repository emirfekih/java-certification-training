import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterService {

  constructor(private http:Http) { }

  signUp(params){
    return this.http.post('https://localhost:8443/addUser', params)
      .map(response => response);
  };

}
