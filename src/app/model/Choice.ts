export class Choice {

  choiceId:number;
  choiceStatement:string;
  correct:boolean;

  selected:boolean;



  constructor(data:any){
    data= data || {};
    this.choiceId=data.choiceId;
    this.choiceStatement=data.choiceStatement;
    this.correct=data.correct;
    this.selected=false;

  }
}
