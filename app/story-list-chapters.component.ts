
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Router }           from '@angular/router-deprecated';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { SiteService, SITE_SERVICE_PROVIDERS } from './site.service';
import {NavService} from './nav.service';
// import { HixxService }        from './hixx.service';




@Component({
    selector: 'story-list-chapters',
    templateUrl: 'app/story-list-chapters.component.html',
    styleUrls: ['app/story-list-chapters.component.css'],

    providers: [
        // ROUTER_PROVIDERS,
        SITE_SERVICE_PROVIDERS
        // NavService
        // HixxService

    ]
})

export class StoryListChapters {
    story: any = null;
    svc: ISite;
    chapters: any[] = null;

    constructor(private router: Router,
        private routeParams: RouteParams,
        private siteService: SiteService,
        private navService:NavService
    ) {
        var me = this;

        let data = this.routeParams.get('data');
        if (data !== null) {
            this.story = this.siteService.decode(data);
            // debugger;
            me.navService.setTitle(this.story.title);
            // this.siteService
            let name = this.routeParams.get("name");
            me.svc = this.siteService.get(name);
            // debugger;
            me.getChapters(me.story.link);
            // debugger;
        }
    }
    getChapters(url) {
      var me=this;
      me.chapters=null;
      me.svc.getChapters(url).then(data => {
        // debugger;
          me.chapters = data;
      });
    }
    goContent(item) {
      var me=this;
      item.titleOrg=me.story.title;
      let link = ['StoryContent',{
        name:this.svc.name,
        title:this.siteService.toKhongDau(me.story.title),
        data:this.siteService.encode(JSON.stringify(item))
      }];
      this.router.navigate(link);
    }




}
