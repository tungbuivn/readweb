import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ISite }        from './isite';
import { Component, EventEmitter} from '@angular/core';
export enum EnumCommand {
  HIXX_LIST_STORIES,
  HIXX_LIST_STORY_CHAPTERS,
  HIXX_CHAPTER_CONTENT,

  SS_LIST_STORIES,
  SS_LIST_STORY_CHAPTERS,
  SS_CHAPTER_CONTENT
}

@Injectable()
export class DocService {
    static rqNum: number = 0;
    socket: any;
    static onCompleted: EventEmitter<any> = new EventEmitter<any>();
    queues: any[] = [];
    constructor(private http: Http) {
        var me = this;
        this.socket = io();
        this.socket.on('url-data', function(data) {
            var js = JSON.parse(data);
            DocService.onCompleted.emit(js);
        });
    }
    getUrl(url: string,cmd:EnumCommand) {
        var rqId = this.getRqNum();
        var p = new Promise((resolve, reject) => {
            var sub = DocService.onCompleted.subscribe(res => {
                // debugger;
                if (res.id == rqId) {
                    sub.unsubscribe();
                    resolve(res.data);
                }
            });
        });
        this.socket.emit("get-url", JSON.stringify({ url: url, id: rqId,cmd:cmd }));
        return p;
    }
    getRqNum() {
        DocService.rqNum++;
        return DocService.rqNum;
    }
}
