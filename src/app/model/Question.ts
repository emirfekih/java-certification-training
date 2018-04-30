import {Choice} from "./Choice";
import {ChapterDTO} from "./ChapterDTO";


export class Question{
  questionId:number;
  questionHeader:string;
  questionCode:string;
  questionStatement:string;
  questionType:number;
  questionExplanation:string;
  chapter:ChapterDTO;
  choices:Choice[];


  answered:boolean;
  review:boolean;
  showAnswer:boolean;



  constructor(data:any){
    data= data || {};


    this.questionId=data.questionId;
    this.questionHeader=data.questionHeader;
    this.questionCode= data.questionCode;
    this.questionStatement=data.questionStatement;
    this.questionType=data.questionType;
    this.questionExplanation=data.questionExplanation;
    this.choices=[];
    data.choices.forEach(x => this.choices.push(new Choice(x)));
    this.review=false;
    this.answered=false;
    this.showAnswer=false;


this.chapter=new ChapterDTO(data.chapter);


  }
}
