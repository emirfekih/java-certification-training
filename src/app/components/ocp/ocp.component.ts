import { ChapterService } from './../../service/chapter.service';
import { Component, OnInit } from '@angular/core';
import {Chapter} from "../../model/Chapter";

@Component({
  selector: 'app-ocp',
  templateUrl: './ocp.component.html',
  styleUrls: ['./ocp.component.css']
})
export class OcpComponent implements OnInit {
  viewChapters:any;
  chapters:any;
  actualPage:Boolean;
  constructor(private chapterService: ChapterService) { }

  ngOnInit() {

    this.getChapters();

    //for disabling the previous/next button
    this.actualPage=true;
  }

  getChapters(){this.chapterService.getChapters("assets/ocp.json").subscribe(data => {this.chapters=data;
  this.viewChapters=this.chapters.slice(0,5);});


  }

  pass(chapter:Chapter){
    chapter.passed=!chapter.passed;

  }
  toggleChevron(chapter:Chapter){
    chapter.chevron=!chapter.chevron;
  }
  pagination(){
    if (this.actualPage==true){this.viewChapters=this.chapters.slice(5,10);
      this.actualPage=false;}
      else{
      this.viewChapters=this.chapters.slice(0,5);
      this.actualPage=true;

    }

  }
}
