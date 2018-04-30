export class Config {
  timerOn:boolean;
  shuffleOptions:boolean;
  duration:number;
  testId:number;
  questionRange:boolean;
  firstQuestion:number;
  lastQuestion:number;
  takeOnlyChapters:boolean;
  chapters:number[];

  constructor(){
    this.testId=1;
    this.questionRange=false;
    this.firstQuestion=0;
    this.lastQuestion=0;
    this.takeOnlyChapters=false;
    this.chapters=[];
    this.timerOn=false;
    this.duration= 0;
    this.shuffleOptions=false;

  }

}








