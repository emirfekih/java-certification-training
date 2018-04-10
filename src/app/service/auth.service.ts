import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor(private http: Http) {

   }

   login(credentials){
     return this.http.post('https://localhost:8443/auth', credentials)
      .map(response => {
        let result = response.json();
        if(result && result.token ){
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      });
   }

   logout(){
     localStorage.removeItem('token');
   }

   isLoggedIn(){
      return tokenNotExpired();

   }
}
