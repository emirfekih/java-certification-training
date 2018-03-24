import { Injectable } from '@angular/core';
import {Chapter} from "../model/Chapter";
import {HttpClient} from "@angular/common/http";

import "rxjs/add/operator/map";

@Injectable()
export class ChapterService {

  constructor(private http:HttpClient) { }

  getChapters(url:string){return this.http.get<Chapter[]>(url)}

}
