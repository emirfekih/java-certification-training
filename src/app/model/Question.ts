import {Choice} from "./Choice";
import {ChapterDTO} from "./ChapterDTO";


export class Question{
  questionId:number;
  questionStatement:string;
  questionType:string;
  questionExplanation:string;
  chapter:ChapterDTO;
  choices:Choice[];

  answered:boolean;
  review:boolean;



  constructor(data:any){
    data= data || {};


    this.questionId=data.questionId;
    this.questionStatement=data.questionStatement;
    this.questionType=data.questionType;
    this.questionExplanation=data.questionExplanation;
    this.choices=[];
    data.choices.forEach(x => this.choices.push(new Choice(x)));
    this.review=false;


this.chapter=new ChapterDTO(data.chapter);


  }
}
