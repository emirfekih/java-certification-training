import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons, NgbModal, NgbModalRef, NgbTimepickerConfig,
  NgbTimeStruct
} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, Validators} from "@angular/forms";
import {ExamService} from "../../service/exam.service";
import {Config} from "../../model/Config";
import {Test} from "../../model/Test";
import {ChapterService} from "../../service/chapter.service";
import {ChapterDTO} from "../../model/ChapterDTO";


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
  selectedTest:number;
  chapters:ChapterDTO[];
  selectedChapters:number[];
  ocapDTO:any;



  constructor(private authService: AuthService,private modalService: NgbModal,config: NgbTimepickerConfig
              ,private examService: ExamService,private chapterService:ChapterService) {


              config.size = "small";
  }

  ngOnInit() {
    this.selectedChapters=[];
    this.chapters=[];

    this.examService.currentMessage.subscribe(testConfig => this.testConfig = testConfig)
  }

  changeTest(){
    //loading test chapters every time a test is changed
    this.chapterService.getTestChapters(this.selectedTest).subscribe(x=> this.chapters=x);
  }

  chooseTestType(typeValue){
    if(typeValue=='OCA'){

      this.examService.getTestByType('OCA').subscribe(x=> {this.ocapDTO=x;} )
      }
      else if(typeValue=='OCP'){
      this.examService.getTestByType('OCP').subscribe(x=> {this.ocapDTO=x;} )


    }


  }


  configurateTest(){
    //BIND ALL TEST CONFIG HERE
    this.testConfig.duration= (this.time.hour *3600 + this.time.minute*60)
    this.testConfig.testId=this.selectedTest;
    this.testConfig.chapters=this.selectedChapters;
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
    //set a new configuration for exam
    this.examService.changeMessage(new Config());

    //open the modal
    this.modalReference=this.modalService.open(content,{size:'lg'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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
