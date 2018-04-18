import {Question} from "./Question";

export class Test {
  testId:number;
  testName:string;
  testType:string;
  questions:Question[];

  constructor(data:any){
    if (data){
      this.testId=data.testId;
      this.testName=data.testName;
      this.testType=data.testType;
      this.questions=[];
      data.questions.forEach(x => this.questions.push(new Question(x)));
    }
  }

  getChapters() {
    let chapters = new Set<string>();
    this.questions.forEach(q => chapters.add(q.chapter.chapterName))

    return(chapters)
  }

}
