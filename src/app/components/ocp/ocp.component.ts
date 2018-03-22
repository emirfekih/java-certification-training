import { Component, OnInit } from '@angular/core';
import {Chapter} from "../../model/Chapter";

@Component({
  selector: 'app-ocp',
  templateUrl: './ocp.component.html',
  styleUrls: ['./ocp.component.css']
})
export class OcpComponent implements OnInit {

  chapters:Chapter[];
  constructor() { }

  ngOnInit() {
    this.chapters=[{id:1,title: "Advanced Class Design",passed: false,chevron:false},
      {id:2,title: "Design Patterns And Principles",passed: false,chevron:false},
      {id:3,title: "Generics And Collections",passed: false,chevron:false},
      {id:4,title: "Functional Programming",passed: false,chevron:false},
      {id:5,title: "Dates, Strings And Localization",passed: false,chevron:false},
      {id:6,title: "Exceptions And Assertions",passed: false,chevron:false},
      {id:7,title: "Concurrency",passed: false,chevron:false},
      {id:8,title: "IO",passed: false,chevron:false},
      {id:9,title: "NIO2",passed: false,chevron:false},
      {id:10,title: "JDBC",passed: false,chevron:false}];
  }

  pass(chapter:Chapter){
    chapter.passed=!chapter.passed;

  }
  toggleChevron(chapter:Chapter){
    chapter.chevron=!chapter.chevron;
  }

}
