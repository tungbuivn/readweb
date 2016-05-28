/// <reference path="../doc.service.ts"/>
import {Component, Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ISite }        from './isite';
import { DocService,EnumCommand }        from './doc.service';

@Injectable()
export class HixxService implements ISite extends DocService {
    name: string = "Hixx";
    desc: string = "Trang hixx.info"


    constructor(private http: Http) {
        super();
        // this.onDownload.subscribe(data=>{
        //   // debugger;
        // })
    }
    getSearchInfo(){
      return [];
    }
    getListDocs(url) {

        return this.getUrl(url||"http://mtruyen.hixx.info/truyen/search/index/tt/FULL",EnumCommand.HIXX_LIST_STORIES);

    }
    getChapters(url) {
      // debugger;
      return this.getUrl(url,EnumCommand.HIXX_LIST_STORY_CHAPTERS);

    }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
