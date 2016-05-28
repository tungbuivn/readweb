import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router-deprecated';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { Site }        from './site';
import { SiteService,SITE_SERVICE_PROVIDERS }        from './site.service';
// import { HixxService }        from './hixx.service';
import {NavService} from './nav.service';



@Component({
    selector: 'list-site',
    templateUrl: 'app/list-site.component.html',
    styleUrls: ['app/list-site.component.css'],

    providers: [
      // ROUTER_PROVIDERS
// HixxService,
SITE_SERVICE_PROVIDERS
    ]
})

export class ListSiteComponent implements OnInit {

    sites: ISite[] = [];

    constructor(private router: Router,
    private siteService: SiteService,
    private navService:NavService
    ) {
      navService.setTitle("Danh sách nguồn");
    }

    ngOnInit() {

        this.sites = this.siteService.getSites();
    }
    gotoDetail(site: Site) {

        let link = ['SiteDetail',{name:site.name}];
        this.router.navigate(link);
    }

}
