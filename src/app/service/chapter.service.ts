import { Injectable } from '@angular/core';
import {Chapter} from "../model/Chapter";
import {HttpClient} from "@angular/common/http";

import "rxjs/add/operator/map";
import {environment} from "../../environments/environment";
import {ChapterDTO} from "../model/ChapterDTO";

@Injectable()
export class ChapterService {

  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }

  getChapters(url:string){return this.http.get<Chapter[]>(url)}

  getTestChapters(testId:number){return this.http.get<ChapterDTO[]>(this.API_URL+'/tests/getAllChaptersDTO/'+testId)}

}
