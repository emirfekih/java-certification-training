import {Component, OnInit, NgZone, ElementRef, ViewChild} from '@angular/core';
import {ExamService} from "../../service/exam.service";
import {Test} from "../../model/Test";
import {Chapter} from "../../model/Chapter";
import {Question} from "../../model/Question";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeWhile';
import {Choice} from "../../model/Choice";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TimerService} from "../../service/timer.service";




@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export class ExamComponent implements OnInit {



  test:Test= new Test(null);
  mode:string;
  filtered:any;
  answeredQuestions:number=0;
  countDown:number = 1800;
  timerOn:boolean = true;

  closeResult:any;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };


  /*Old TIMER
  private myobs = Observable.timer(0,1000).takeWhile(()=>this.countDown>0).map(m => m);
  this.subscription=this.myobs.subscribe(x => this.countDown--);
 */
  constructor(private examService:ExamService,private modalService:NgbModal, private timerService:TimerService) { }

  ngOnInit() {


    this.mode='test';
    this.timerService.getTimer(this.countDown).subscribe(x=> this.countDown=x);
    this.loadTest();

  }

timerDisable(){this.timerOn=false}
  timerEnable(){
    this.timerOn=true;

  }

  loadTest(){
    this.examService.getExam("assets/tests.json").subscribe(data => {this.test=new Test(data);
    this.pager.count=this.test.questions.length;
    if (this.test.questions){
      this.filtered=this.test.questions.slice(this.pager.index, this.pager.index + this.pager.size)}
     else {this.filtered=[];}
    });

  }


  goTo(index: number) {

    /* count answered questions then go to next/previous page */
    if (this.isAnswered(this.test.questions[this.pager.index]) && this.mode==='test') {
      this.test.questions[this.pager.index].answered = true;
      this.answeredQuestions = this.countAnswers();
    }

    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.filtered=this.test.questions.slice(this.pager.index, this.pager.index + this.pager.size);
      this.mode='test';

    }
  }

/*  get filteredQuestions() {
    return (this.test.questions) ?
      this.test.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }*/

  reviewQuestion(question:Question){
    question.review=!question.review;

  }

  showAnswer(question:Question){
    question.showAnswer=!question.showAnswer;
    console.log("showed answer for question"+ question.questionId)
  }



  onSelectionChange(question:Question,choice:Choice){
    question.choices.forEach(x => x.selected =(x.choiceId === choice.choiceId))

  }

  isAnswered(question: Question) {
    return question.choices.find(x => x.selected) ? true : false;
  };

  isCorrect(question: Question) {
    return question.choices.every(x => x.selected === x.correct) ? 'correct' : 'wrong';
  };


  countAnswers(){
    let c=0;
    this.test.questions.forEach(x => {if(x.answered){c++}})
    return (c);

  }

  open(content) {
    this.modalService.open(content,{size:'sm',centered:true}).result.then((result) => {
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
