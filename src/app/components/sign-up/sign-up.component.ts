import { Router } from '@angular/router';
import { UsernameValidators } from './UsernameValidators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  passed: boolean;
  pwdPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{4,50}$";
  form = new FormGroup({
    firstname: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    lastname: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      UsernameValidators.cannotContainSpaces
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(this.pwdPattern)
    ])

  })

  constructor(
    private registerService: RegisterService,
    private router: Router
    ){

  }
  get firstname(){
    return this.form.get('firstname');
  }

  get lastname(){
    return this.form.get('lastname');
  }
  get username(){
    return this.form.get('username');
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }


  signUp(){
    let data  = this.form.value;
    let date = new Date();
    let formatDate = [date.getFullYear(), date.getMonth()+1, date.getDate()].join('-')+' '+
              [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
    data["enabled"]= true;
    data["lastPasswordResetDate"]= formatDate;
    this.registerService.signUp(data)
      .subscribe(response => {
        if(response) 
        {
          this.passed= true;
          setTimeout(()=> {
            this.router.navigate(['/']);
          },2000);
        }
      },);
  }

    
}
