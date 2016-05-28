
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Router }           from '@angular/router-deprecated';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { Site }        from './site';
import { SiteService,SITE_SERVICE_PROVIDERS } from './site.service';
import {NavService} from './nav.service';
// import { HixxService } from './hixx.service';
import { ISite }       from './isite';




@Component({
    selector: 'site-detail',
    templateUrl: 'app/site-detail.component.html',
    styleUrls: ['app/site-detail.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        // ROUTER_PROVIDERS,
        SITE_SERVICE_PROVIDERS

    ]
})

export class SiteDetailComponent {
    @Input() site: Site;
    private svc: ISite;
    private doc:any=null;
    siteName:string;


    constructor(private router: Router,
        private routeParams: RouteParams,
        private siteService: SiteService,
        private navService:NavService
    ) {
      var me=this;
      me.navService.setTitle("Danh sách truyện");
        this.siteName = this.routeParams.get('name');
        if (this.siteName !== null) {
            me.svc=me.siteService.get(this.siteName);
            me.getListDocs();

        }
    }
    getListDocs(url){
      var me=this;
      me.doc=null;
      me.svc.getListDocs(url).then(res=>{
        // debugger;
        me.doc=res;

      });
    }


    goListChapter(doc){
      var me=this;
      let link = ['Story',{
        name:this.siteName,
        title:this.siteService.toKhongDau(doc.title),
        data:this.siteService.encode(JSON.stringify(doc))
      }];
      this.router.navigate(link);
    }




}
