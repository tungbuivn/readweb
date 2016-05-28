
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Router }           from '@angular/router-deprecated';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { SiteService, SITE_SERVICE_PROVIDERS } from './site.service';
import {NavService} from './nav.service';
// import { HixxService }        from './hixx.service';




@Component({
    selector: 'story-content',
    templateUrl: 'app/story-content.component.html',


    providers: [
        // ROUTER_PROVIDERS,
        SITE_SERVICE_PROVIDERS
        // NavService
        // HixxService

    ]
})

export class StoryContent {
content:any;
svc:ISite;
doc:any;
storyTitle:string="";

    constructor(private router: Router,
        private routeParams: RouteParams,
        private siteService: SiteService,
        private navService:NavService
    ) {
        var me = this;

        let data = this.routeParams.get('data');
        if (data !== null) {
            this.content = this.siteService.decode(data);
            let name = this.routeParams.get("name");
            me.svc = this.siteService.get(name);


            this.getContent(this.content.link);

            // debugger;
        }
        this.storyTitle=this.routeParams.get('title');
        // navService.setTitle(this.storyTitle);
    }
    getContent(url) {

      var me=this;
      this.svc.getChapterContent(url).then(data=>{
        // debugger;
        me.navService.setTitle(this.content.titleOrg+" - "+data.title);
        me.doc=data;
        // debugger;
      });
    }
    goToChapter(url) {
      var me=this;
      var item=$.extend({},this.content,{link:url,title:me.storyTitle});

      let link = ['StoryContent',{
        name:this.svc.name,
        title:this.siteService.toKhongDau(me.storyTitle),
        data:this.siteService.encode(JSON.stringify(item))
      }];
      this.router.navigate(link);
    }


}
