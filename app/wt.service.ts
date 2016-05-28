import {Component, Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ISite }        from './isite';
import { DocService }        from './doc.service';

@Injectable()
export class WtService implements ISite extends DocService {
  name:string="Wt";
  desc:string="Trang web truyen.info"


  constructor(private http: Http) {
    super();
    // this.onDownload.subscribe(data=>{
    //   // debugger;
    // })
  }
  getListDocs(){

    return this.getUrl("http://mtruyen.hixx.info/truyen/search/index/tt/FULL");

  }

}
