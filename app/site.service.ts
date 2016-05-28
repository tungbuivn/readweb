import { Component, Injectable, Inject, Injector, provide, ReflectiveInjector }    from '@angular/core';
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {EnumCommand} from './doc.service';
import { HixxService }        from './hixx.service';
import { WtService }        from './wt.service';
import { SsService }        from './ss.service';

import { ISite }        from './isite';

export {EnumCommand}
// export  *         from './hixx.service';

// export HixxService=HixxService;

var hashids = new Hashids();
// var car = injector.get(Car);
@Injectable()
export class SiteService {

    sites: ISite[] = [];

    constructor(private http: Http,
      private hixxService: HixxService,
      private wtService: WtService,
      private ssService: SsService
    ) {
        // debugger;
        //       let injector: any = ReflectiveInjector.resolveAndCreate([provide(HixxService,{useClass:HixxService})]);
        // this.myService = this.injector.get(HixxService);
        // var inj=this.injector;
        //         debugger;
        //  var injector = Injector.resolveAndCreate([HixxService]);
        // debugger;
        // var svc=ReflectiveInjector.resolveAndCreate([HixxService]);
        let args = arguments;
        for (var i in args) {
            if (typeof (args[i].desc) != "undefined") {
                this.sites.push(args[i]);
            }
        }
        // debugger;
        // this.sites = [this.hixxService,this.wtService];
    }
    getSites() {
        return this.sites;
    }
    get(name: string): ISite {

        var site: ISite = null;
        for (var i in this.sites) {
            if (this.sites[i].name == name) {
                site = this.sites[i];
                break;
            }
        }
        return site;
    }
    encode(str) {
        var b = [];
        for (var i in str) {
            var s = str[i].charCodeAt(0);
            // if (s.length<=2) s="00"+s;
            b.push(s);
        }

        var id = hashids.encode(b);

        return id;
    }
    decode(str) {
        var data = hashids.decode(str);
        var b = [];
        for (var i in data) {
            var s = String.fromCharCode(data[i]);
            // if (s.length<=2) s="00"+s;
            b.push(s);
        }
        // debugger;
        var o = JSON.parse(b.join(""));
        return o;
    }
    toKhongDau(str) {

        str = str || "";
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
        str = str.replace(/^\-+|\-+$/g, "");
        //cắt bỏ ký tự - ở đầu và cuối chuỗi
        return str;

    }


}


export let SITE_SERVICE_PROVIDERS = [
    provide(SiteService, {
        useClass: SiteService,
        deps: [Http, HixxService, WtService, SsService]
    }),

    WtService,
    SsService,
    HixxService


];
