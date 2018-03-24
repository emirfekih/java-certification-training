/**
 * Created by ASUS on 25/02/2018.
 */
import {Covered} from './Covered'

export class Chapter {
  id:any;
  title: string;
  passed: boolean;
  chevron:boolean;
  covered:Covered[];
  objectives:string[];
  summary:string[];

}
