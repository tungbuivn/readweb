// import {bootstrap}         from 'angular2/platform/browser';
import { Component, provide, LocationStrategy } from '@angular/core';
import { RouteConfig, AsyncRoute, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {NavService} from './nav.service';


import {BrowserPlatformLocation} from   '@angular/platform-browser';
// import {componentProxyFactory} from './component-proxy';

import { ListSiteComponent }  from './list-site.component';
// import { SiteDetailComponent }  from './site-detail.component';
// import { DashboardComponent }  from './dashboard.component';
// import { HeroesComponent }     from './heroes.component';
// import { HeroDetailComponent } from './hero-detail.component';
// import { HeroService }         from './hero.service';
import { SiteService }         from './site.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        SiteService,
        NavService
        // HeroService

    ]
})
@RouteConfig([

    { path: '/list-site', name: 'ListSite', component: ListSiteComponent, useAsDefault: true },
    new AsyncRoute({
        path: '/site-detail/:name',
        loader: () => System.import('./app/site-detail.component').then(m => m.SiteDetailComponent),
        name: 'SiteDetail'
    }),
    new AsyncRoute({
        path: '/story-list/:name/:title/:data',
        loader: () => System.import('./app/story-list-chapters.component').then(m => m.StoryListChapters),
        name: 'Story'
    }),
    new AsyncRoute({
        path: '/Content/:name/:title/:data',
        loader: () => System.import('./app/story-content.component').then(m => m.StoryContent),
        name: 'StoryContent'
    }),

    // { path: '/site-detail/:name',  name: 'SiteDetail',  component: SiteDetailComponent },
    // { path: '/Dashboard', name: 'Dashboard', component: DashboardComponent },
    // { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent },
    // new AsyncRoute({
    //     path: '/heroes',
    //     loader: () => System.import('./app/heroes.component').then(m => m.HeroesComponent),
    //     name: 'Heroes'
    // })
    // { path: '/heroes',  component:componentProxyFactory({
    //     path: './app/heroes.component',
    //     provide: m => m.HeroesComponent
    //   })
    //   ,   name: 'Heroes'
    //   // ,     component: HeroesComponent
    // }
])
export class AppComponent {
    title = 'Book reader';
    doc: any = {};
    constructor(private navService: NavService) {

        navService.onUpdate.subscribe(data => {

            switch (data.cmd) {

                case 0:
                    this.doc = data;
                    break;
                case 1:
                    this.doc.title = data.title;
                    break;

            }

        });
    }
}
// bootstrap(AppComponent, [
//   ROUTER_PROVIDERS,
//   provide(LocationStrategy,
//          {useClass: HashLocationStrategy}) // .../#/crisis-center/
// ]);

// bootstrap(AppComponent, [
//   ROUTER_PROVIDERS,
//   provide(LocationStrategy, {useClass: HashLocationStrategy})
// ]);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
