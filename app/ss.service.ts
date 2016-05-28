import {Component, Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ISite }        from './isite';
import { DocService, EnumCommand}        from './doc.service';

@Injectable()
export class SsService implements ISite extends DocService {
    name: string = "sstruyen";
    desc: string = "Trang web sstruyen"


    constructor(private http: Http) {
        super();
        // this.onDownload.subscribe(data=>{
        //   // debugger;
        // })
    }
    getSearchInfo() {
        return [{
            label: "Tất Cả",
            value: ""
        }, {
                label: "Xuyên Không",
                value: "xuyen-khong"
            }, {
                label: "Kiếm Hiệp",
                value: "kiem-hiep"
            }, {
                label: "Tiên Hiệp",
                value: "tien-hiep"
            }, {
                label: "Quân Sự",
                value: "quan-su"
            }, {
                label: "Đô Thị",
                value: "do-thi"
            }, {
                label: "Võng Du",
                value: "vong-du"
            }, {
                label: "Dị Năng",
                value: "di-nang"
            }, {
                label: "Khoa Huyễn",
                value: "khoa-huyen"
            }, {
                label: "Trinh Thám",
                value: "trinh-tham"
            }, {
                label: "Truyện Ma",
                value: "truyen-ma"
            }];
    }
    buildSearch(cate: string, search: string) {
        search = search || "";
        cate = cate || "tien-hiep";
        var q = {
            lib: "all",
            cate: cate,
            order: 8,
            full: "on"
        };
        if (search != "") {
            q.search = search;
        }
        return "http://sstruyen.com/m/index.php?" + $.param(q);
    }

    getListDocs(url) {

        return this.getUrl(url || this.buildSearch(), EnumCommand.SS_LIST_STORIES);

    }
    normUrl(url) {
      if (url.match(/http:\/\/sstruyen.com/)==null) {
        url="http://sstruyen.com"+url;
      }
      return url;
    }
    getChapters(url) {
        // debugger;

        return this.getUrl(this.normUrl(url), EnumCommand.SS_LIST_STORY_CHAPTERS);

    }
    getChapterContent(url) {
      return this.getUrl(this.normUrl(url), EnumCommand.SS_CHAPTER_CONTENT);
    }

}
