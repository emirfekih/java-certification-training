import {HttpHeaders} from "@angular/common/http";

export const environment = {
  production: true,
  API_URL: 'http://localhost:8080',
  httpOptions: {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
};
