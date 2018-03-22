import { Component, OnInit } from '@angular/core';
import  { Chapter } from '../../model/chapter';
@Component({
  selector: 'app-ocasummary',
  templateUrl: './ocasummary.component.html',
  styleUrls: ['./ocasummary.component.css']
})
export class OcasummaryComponent implements OnInit {

  chapters: Chapter[];




  constructor() { }

  ngOnInit() {
    this.chapters=[{ id:1,title: "Java Building Blocks",passed: false,chevron:false},
      {id:2,title:"Java Operators & Assignments",passed:false,chevron:false},
      {id:3,title:"Core Java APIs",passed:false,chevron:false},
      {id:4,title:"Methods & Encapsulation",passed:false,chevron:false},
      {id:5,title:"Class Design",passed:false,chevron:false},
      {id:6,title:"Exceptions",passed:false,chevron:false},];
  }

  pass(chapter:Chapter){
    chapter.passed=!chapter.passed;

  }
  toggleChevron(chapter:Chapter){
    chapter.chevron=!chapter.chevron;
  }


}
