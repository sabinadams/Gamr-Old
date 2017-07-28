import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '../../../services/http-interceptor-service';
import { BaseService } from '../../../services/base-service';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { EventService } from '../../../services/event-service';

import 'rxjs/add/operator/map';

@Injectable()
export class TimelineService extends BaseService {

  // Creates an observable stream used for passing along commands to remove feed items from the page/db
  private destroyerEvent = new Subject<any>();
  $feedDestroyer = this.destroyerEvent.asObservable();
  public timelineUpdate = new Subject<any>();
  // Creates an observable stream used for passing along commands to add feed items from the page/db
  // private creatorEvent = new Subject<any>();
  // $feedCreator = this.creatorEvent.asObservable();
  private pollTimestamp;
  // super() allows us to use BaseService's instance variables
  constructor( private _http: HttpClient, private _eventService: EventService ) {
    super();
  }

  public convertTimestamp( timestamp ): string {
    const date = new Date(timestamp).toISOString();
    return date.substring(0, date.indexOf('.')).replace('T', ' ').replace('Z', '');
  }

  // Grabs posts, loads more posts, and handles post polling
  populateFeed( timestamp: string, polling: boolean ): Observable<any> {
    return this._http.get(this.baseURL + `/feed/${timestamp}/${polling}/`).map((res: Response) => {
      return res.json();
    }).catch( err => {
      return Observable.throw(err || 'Server Error');
    });
  }

  // Deletes feed item from the db
  deleteFeedItem( itemID: number ): Observable<any> {
    return this._http.post(this.baseURL + `/feed/delete/`, {ID: itemID}).map((res: Response) => {
      if ( res.json().status === 200 ) { this._eventService.emitPostCount( res.json().post_count ); }
      return res.json();
    }).catch( err => {
      return Observable.throw(err || 'Server Error');
    });
  }

  saveItem( text: string, attachments: Array<any>, post_ID?: number, comment_ID?: number ): Observable<any> {
    const post = {text: text, attachments: attachments};
    if ( post_ID ) { post['postID'] = post_ID; };
    if ( comment_ID ) { post['commentID'] = comment_ID; };
    return this._http.post(this.baseURL + `/feed/save/`, {data: post}).map( res => {
      if ( res.json().status === 200 ) { this._eventService.emitPostCount( res.json().post_count ); }
      return res.json();
    }).catch( err => {
      return Observable.throw(err || 'Server Error');
    });
  }

  likeFeedItem( itemID ) {
    return this._http.post(this.baseURL + `/feed/like/`, {itemID: itemID}).map((res: Response) => {
      return res.json();
    }).catch( err => {
      return Observable.throw(err || 'Server Error');
    });
  }
  // Handles the destroy item command and passes along what needs to be removed from the page to the timeline component
  emitDestroyItem(type: string, postID: number, commentID: number, replyID: number): void {
    const targets = {postID: postID, commentID: commentID, replyID: replyID};
    const targetID = targets[`${type}ID`];
    this.deleteFeedItem(targetID).subscribe( res => {
      if ( res.status === 200 ) {
        this.destroyerEvent.next({
          type: type,
          postID: postID,
          commentID: commentID,
          replyID: replyID,
          targetID: targetID
        });
      } else {
        // Handle Error
      }
    });
  }

  public pollProcess() {
    setInterval( () => {
      this.populateFeed( this.pollTimestamp, true).subscribe( res => {
        if (res.length){
          this.pollTimestamp = this.convertTimestamp(res[0].timestamp);
          this.timelineUpdate.next({type: 'many', data: res});
        }
      });
    }, 20000);
  }

  updatePollTimestamp( timestamp: string ): void {
    this.pollTimestamp = this.convertTimestamp(timestamp);
  }
}
