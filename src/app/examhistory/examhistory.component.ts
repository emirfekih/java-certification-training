import { Component, OnInit } from '@angular/core';
import {ExamhistoryService} from "../service/examhistory.service";
import {AuthService} from "../service/auth.service";
import {ExamService} from "../service/exam.service";
import {UserTest} from "../model/UserTest";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-examhistory',
  templateUrl: './examhistory.component.html',
  styleUrls: ['./examhistory.component.css']
})
export class ExamhistoryComponent implements OnInit {

  private API_URL= environment.API_URL;
data:any;




  constructor(private examHistory:ExamhistoryService,private examService:ExamService) { }

  ngOnInit() {
    this.examService.getCurrentUser().subscribe(x=> this.data=x);





    var timestamp = new Date(1527087626000).toISOString();

  }

  toISODate(timestamp:number){
    return(new Date(timestamp).toISOString().split('T'))


  }

  getHours(t){
    return Math.floor( (t/(60*60)) % 24);
  }

  getMinutes(t){
    return Math.floor( (t/60) % 60 );
  }

  getSeconds(t){
    return Math.floor( (t) % 60 );
  }




}
