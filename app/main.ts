// Imports for loading & configuring the in-memory web api
import { provide,enableProdMode }    from '@angular/core';
import { XHRBackend } from '@angular/http';

enableProdMode();
// import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
// import { InMemoryDataService }               from './in-memory-data.service';

import {
  PlatformLocation,
  Location,
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy,
  APP_BASE_HREF}
from '@angular/common';

// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }   from './app.component';

/*
bootstrap(AppComponent, [ HTTP_PROVIDERS ]);
 */
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy,           {useClass: HashLocationStrategy}) // .../#/crisis-center/
    // ,
    // provide(XHRBackend, { useClass: InMemoryBackendService }), // in-mem server
    // provide(SEED_DATA,  { useClass: InMemoryDataService })     // in-mem server data
]);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
