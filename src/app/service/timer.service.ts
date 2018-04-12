import { Injectable } from '@angular/core';
import {mapTo, scan, startWith, switchMap, takeWhile} from 'rxjs/operators';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {merge} from 'rxjs/observable/merge';
import {empty} from 'rxjs/observable/empty';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {interval} from "rxjs/observable/interval";
import {getOrCreateElementRef} from "@angular/core/src/render3/di";

@Injectable()
export class TimerService {

  constructor() { }

  getTimer(duration: number){
     const pButton = document.getElementById('pause');
     const rButton = document.getElementById('resume');

    //let interval$ = Observable.timer(0,1000).pipe(mapTo(-1));
    let interval$ = interval(1000).pipe(mapTo(-1));

    let pause$ = fromEvent(pButton, 'click').pipe(mapTo(false));
    let resume$ = fromEvent(rButton,'click').pipe(mapTo(true));

    return (merge(pause$, resume$).pipe(
      startWith(true),
      switchMap(val => (val ? interval$ : empty())),
      scan((acc, curr) => (curr ? curr + acc : acc), duration),
      takeWhile(v => v >= 0)
    ));



  }



}
