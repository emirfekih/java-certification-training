import { Component, OnInit } from '@angular/core';
import  { Chapter } from '../../model/chapter';
import {ChapterService} from "../../service/chapter.service";
import {Config} from "../../model/Config";
import {ExamService} from "../../service/exam.service";
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../service/auth.service";
@Component({
  selector: 'app-ocasummary',
  templateUrl: './ocasummary.component.html',
  styleUrls: ['./ocasummary.component.css']
})
export class OcasummaryComponent implements OnInit {

  chapters:Chapter[];
  testConfig:Config;
  modalReference:NgbModalRef;
  closeResult:string;




  constructor(private chapterService:ChapterService,private examService:ExamService,private modalService: NgbModal, private authService:AuthService) { }

  ngOnInit() {

    this.getChapters();

    this.examService.currentMessage.subscribe(testConfig => this.testConfig = testConfig);

  }

  getChapters(){this.chapterService.getChapters("assets/oca.json").subscribe(data => this.chapters=data)}


  beginTest(chapter:Chapter){
    this.testConfig.timerOn=true;
    this.testConfig.duration=600;
    this.examService.changeMessage(this.testConfig);
    this.modalReference.close();

  }

  toggleChevron(chapter:Chapter){
    chapter.chevron=!chapter.chevron;
  }

  openModal(content,chapter:Chapter) {
    //set a new configuration for exam
    chapter.passed=!chapter.passed;
    this.examService.getTestByType("OCA Chapter "+chapter.chapterId).subscribe(x=> this.testConfig.testId=x[0].testId)


    //open the modal
    this.modalReference=this.modalService.open(content,{size:'sm'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
