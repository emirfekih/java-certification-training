import {Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
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
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TimerService} from "../../service/timer.service";
import {ChartModule} from 'primeng/components/chart/chart';
import index from "@angular/cli/lib/cli";






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
  modalReference:NgbModalRef;
  yourScore:number=0;
  progressScore:string;
  testResult:string;
  elapsedTime:number;
  barData:any;
  correctAnswers:number;


  closeResult:any;
  barChartOptions= {
    title: {
      display: true,
      text: 'Custom Chart Title'
    },
    scales:
      {
        xAxes: [
          {ticks: {
           display:false
          },
        }],
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1,
          }

        }]


      }}

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
    this.loadTest();
    this.timerService.getTimer(this.countDown).subscribe(x=> this.countDown=x);
    this.barData = {
      labels: [],
      datasets: [
        {
          label: 'Correct Answers',
          backgroundColor: '#66ffcc',
          borderColor: '#6544a9',
          data: []
        },
        {
          label: 'Wrong Answers',
          backgroundColor: '#ffb8f0',
          borderColor: '#cc4e0e',
          data: []
        }
      ]
    };



  }

timerDisable(){this.timerOn=false}
  timerEnable(){
    this.timerOn=true;

  }
  endExam(){
    this.mode='ended';
    this.testResult=this.getTestResult(60)
    this.elapsedTime= 1800 - this.countDown;
    let wrongPerChapter=[];
    let correctPerChapter=[];

    for (let c of Array.from(this.test.getChapters().values())){
      let wrong=0;
      let correct=0;
      this.test.questions.forEach(q=> {
        if (q.chapter.chapterName===c && this.isCorrect(q)){correct++}
        else if(q.chapter.chapterName===c && !this.isCorrect(q)){wrong++}
      })
      wrongPerChapter.push(wrong);
      correctPerChapter.push(correct);
      this.barData.labels.push(c);
    }

    this.barData.datasets[0].data=correctPerChapter;
    this.barData.datasets[1].data=wrongPerChapter;





    this.modalReference.close();
  }

  loadTest(){
    this.examService.getExam("assets/tests.json").subscribe(data => {this.test=new Test(data);
    this.pager.count=this.test.questions.length;
    if (this.test.questions){
      this.filtered=this.test.questions.slice(this.pager.index, this.pager.index + this.pager.size)}
     else {this.filtered=[];}
    });

  }

  countCorrectAnswers(test:Test){ let i =0;
    this.test.questions.forEach(x=> {if(this.isCorrect(x)){i++}});
    return i
  }

  getTestResult(sucessRate:number){
    this.correctAnswers=this.countCorrectAnswers(this.test);
    this.yourScore=(this.correctAnswers/this.pager.count)*100;
    this.progressScore=this.yourScore.toPrecision(3);
    return (this.yourScore>= sucessRate ? 'Congratulations':'Failed')

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
    return question.choices.every(x => x.selected === x.correct) ? true : false;
  };


  countAnswers(){
    let c=0;
    this.test.questions.forEach(x => {if(x.answered){c++}})
    return (c);

  }

  open(content) {
    this.modalReference=this.modalService.open(content,{size:'sm',centered:true})
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
