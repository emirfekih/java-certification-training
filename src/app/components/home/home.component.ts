import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons, NgbModal, NgbModalRef, NgbTimepickerConfig,
  NgbTimeStruct
} from "@ng-bootstrap/ng-bootstrap";
import {FormControl} from "@angular/forms";
import {ExamService} from "../../service/exam.service";
import {Config} from "../../model/Config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  modalReference:NgbModalRef;
  closeResult:string;
  time: NgbTimeStruct = {hour: 2, minute: 30, second: 0};
  testConfig:Config;

  ocaDTO=[{id:1,testName:"Exam A"},{id:2,testName:"Exam A"},{id:3,testName:"Exam A"}]


  constructor(private authService: AuthService,private modalService: NgbModal,config: NgbTimepickerConfig,private examService: ExamService) {
    config.size = "small";
  }

  ngOnInit() {
    this.examService.currentMessage.subscribe(testConfig => this.testConfig = testConfig)
  }



  configurateTest(){
    //BIND ALL TEST CONFIG HERE
    this.testConfig.duration= (this.time.hour *3600 + this.time.minute*60)
    //END BINDING
    this.examService.changeMessage(this.testConfig);
    this.modalReference.close();

  }

  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour > 2) {
      return {tooLong: true};
    }
    if (value.hour === 2  && value.minute > 30) {
      return {tooLong:true};}

    return null;
  });

  openModal(content) {
    this.modalReference=this.modalService.open(content,{size:'lg'})
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    console.log("call web service");
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log(this.time.hour);
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
