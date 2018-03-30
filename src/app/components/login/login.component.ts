import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signIn(credentials){
    this.authService.login(credentials)
      .subscribe(
        result => {
          if(result) 
            this.router.navigate(['/']);
          else
            this.invalidLogin = true;
        },
        (error: Response) => {
          this.invalidLogin = true;
        }
      )

  }

}
