import { Component, OnInit } from '@angular/core';
import {ExamService} from "../../service/exam.service";
import {Test} from "../../model/Test";
import {Chapter} from "../../model/Chapter";
import {Question} from "../../model/Question";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  test:Test= new Test(null);


  pager = {
    index: 0,
    size: 1,
    count: 1
  };


  constructor(private examService:ExamService) { }

  ngOnInit() {
    this.loadTest();



  }


  loadTest(){
    this.examService.getExam("assets/tests.json").subscribe(data => {this.test=new Test(data);
    this.pager.count=this.test.questions.length;});

  }


  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
    }
  }

  get filteredQuestions() {
    return (this.test.questions) ?
      this.test.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  reviewQuestion(question:Question){
    question.review=!question.review;
  }

}
