import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class EventService {
    // Observable string sources
    private unread = new Subject<any>();
    // Observable string streams
    unreadCount$ = this.unread.asObservable();
    // Service message commands
    emitUnread(change: any) {
        this.unread.next(change);
    }

    private mergeUnread = new Subject<any>();

    merger$ = this.mergeUnread.asObservable();

    emitUnreadMerger(message: any) {
    	this.mergeUnread.next(message);
    }
}