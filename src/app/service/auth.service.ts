import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt'
import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {

  private API_URL= environment.API_URL;


  constructor(private http: Http) {

   }

   login(credentials){
     return this.http.post(this.API_URL+'/auth', credentials)
      .map(response => {
        let result = response.json();
        if(result && result.token ){
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      });
   }

   getToken(): string {
    return localStorage.getItem('token');
   }

   logout(){
     localStorage.removeItem('token');
   }

   isLoggedIn(){
      return tokenNotExpired();

   }
}
