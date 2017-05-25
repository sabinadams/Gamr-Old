import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class EventService {
    // Observable string sources
    private unread = new Subject<any>();
    // Observable string streams
    unreadCount$ = this.unread.asObservable();

    // Used to trigger a timeline update. Merges the post buffer with the array of posts 
    // already on the DOM
    private mergeUnread = new Subject<any>();
    merger$ = this.mergeUnread.asObservable();

    // Service message commands
    emitUnread(change: any) { this.unread.next(change); }

    emitUnreadMerger(message: any) { this.mergeUnread.next(message); }
}
