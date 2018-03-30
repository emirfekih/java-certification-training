export class ChapterDTO {


  chapterId: any;
  chapterName: string;

  constructor(data:any){
    data=data || {};
    this.chapterId=data.chapterId;
    this.chapterName=data.chapterName;
  }

}
