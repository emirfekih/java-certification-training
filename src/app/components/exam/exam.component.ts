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
import {Config} from "../../model/Config";
import {environment} from "../../../environments/environment";
import {UserTest} from "../../model/UserTest";
import {UserTestPK} from "../../model/UserTestPK";
import {AuthService} from "../../service/auth.service";






@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export class ExamComponent implements OnInit {

  private API_URL= environment.API_URL;


  test:Test= new Test(null);
  mode:string;
  filtered:any;
  answeredQuestions:number=0;
  countDown:number;
  modalReference:NgbModalRef;
  yourScore:number=0;
  progressScore:string;
  testResult:string;
  elapsedTime:number;
  barData:any;
  correctAnswers:number;
  closeResult:any;
  testConfig:Config = new Config();
  userTest:UserTest;


  barChartOptions= {
    title: {
      display: true,
      text: 'Correct/Wrong answers per chapter'
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

  constructor(private examService:ExamService,private authService:AuthService,private modalService:NgbModal, private timerService:TimerService) { }



  ngOnInit() {

    this.mode='test';
    this.examService.currentMessage.subscribe(testConfig=> this.testConfig=testConfig);
    this.loadTest();


    this.barData = {
      labels: [],
      datasets: [
        {
          label: 'Correct',
          backgroundColor: '#66ffcc',
          borderColor: '#6544a9',
          data: []
        },
        {
          label: 'Wrong ',
          backgroundColor: '#ffb8f0',
          borderColor: '#cc4e0e',
          data: []
        }
      ]
    };




  }



  submitExam(){
    let userTestPk= new UserTestPK(1,this.test.testId);
    let data={userTestPK:userTestPk,
    elapsedTime: this.elapsedTime,
    timeLimit: this.testConfig.duration,
    testScore: this.progressScore,
    nbCorrectAnswers: this.correctAnswers}
    this.userTest=new UserTest(data);
    this.examService.addUserExam(this.userTest).subscribe(()=> console.log("Added user test"))

  }



  endExam(){
    this.mode='ended';
    this.testResult=this.getTestResult(this.test.requiredScore);
    this.elapsedTime= this.testConfig.duration - this.countDown;
    let wrongPerChapter=[];
    let correctPerChapter=[];

    //Count Correct and wrong answers per chapter

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

    if(this.authService.isLoggedIn()){
      let url=this.API_URL+"/getTest/"+this.buildReqParams();
      console.log(url);
      this.examService.getExam(url).subscribe(data => {this.test=new Test(data);
        this.pager.count=this.test.questions.length;
        if (this.test.questions){
          this.filtered=this.test.questions.slice(this.pager.index, this.pager.index + this.pager.size)}
        else {this.filtered=[];}
      });

      //launch timer if enabled in config
      if(this.testConfig.timerOn){
        this.countDown=this.testConfig.duration;
        this.timerService.getTimer(this.countDown).subscribe(x=> this.countDown=x);
    }

    }
    else if(!this.authService.isLoggedIn()){
      this.examService.getExam(this.API_URL+"/freeTest/1").subscribe(data => {this.test=new Test(data);
        this.pager.count=this.test.questions.length;
        if (this.test.questions){
          this.filtered=this.test.questions.slice(this.pager.index, this.pager.index + this.pager.size)}
        else {this.filtered=[];}
      });

    }




  }
  postExam(){

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

  buildReqParams(){

    let reqChapters='';
    this.testConfig.chapters.forEach(x=> reqChapters=reqChapters+x+',');
    let reqParams=this.testConfig.testId+
      '?shuffleOptions='+this.testConfig.shuffleOptions+
      '&questionRange='+this.testConfig.questionRange+
      '&firstQuestion='+this.testConfig.firstQuestion+
      '&lastQuestion='+this.testConfig.lastQuestion+
      '&takeOnlyChapters='+this.testConfig.takeOnlyChapters+
      '&chapters='+
      reqChapters.slice(0,reqChapters.length-1);

    return reqParams

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
