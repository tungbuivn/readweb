import { Component,Injectable, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Headers, Http } from '@angular/http';


@Injectable()
export class NavService {
    onUpdate: EventEmitter<any> = new EventEmitter<any>();


    constructor() {


    }
    setTitle(title:string) {
      // debugger;
        this.onUpdate.emit({cmd:1,title:title});
    }


}
