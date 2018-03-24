import { Component, OnInit } from '@angular/core';
import  { Chapter } from '../../model/chapter';
import {ChapterService} from "../../service/chapter.service";
@Component({
  selector: 'app-ocasummary',
  templateUrl: './ocasummary.component.html',
  styleUrls: ['./ocasummary.component.css']
})
export class OcasummaryComponent implements OnInit {

  chapters:any;




  constructor(private chapterService:ChapterService) { }

  ngOnInit() {

    this.getChapters();
  }

  getChapters(){this.chapterService.getChapters("assets/oca.json").subscribe(data => this.chapters=data)}

  pass(chapter:Chapter){
    chapter.passed=!chapter.passed;

  }
  toggleChevron(chapter:Chapter){
    chapter.chevron=!chapter.chevron;
  }


}
