import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { TimelineService } from './shared/timeline-service';
import { EventService } from '../../services/event-service';

import * as _ from 'lodash';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TimelineComponent implements OnInit {
  posts: any;
  postBuffer: any = [];
  loadingMore = false;
  endOfTime = false;
  @HostListener('window:scroll', ['$event']) checkPosition(event) {
    if ((window.innerHeight + window.scrollY) >= event.target.scrollingElement.scrollHeight - 100) {
        if ( this.loadingMore || this.endOfTime ) { return;  }
        this.loadingMore = true;
        this._timelineService.populateFeed(
          this._timelineService.convertTimestamp(this.posts[this.posts.length - 1].timestamp), false
        ).subscribe( res => {
          this.zone.run(() => {
            if ( res.length === 0 ) {
              this.endOfTime = true;
            }
            this.loadingMore = false;
            this.posts.push(...res);
          });
        });
    }
  }

  constructor(
    private _timelineService: TimelineService,
    private _eventService: EventService,
    private zone: NgZone
  ){}

  ngOnInit() {
    this._timelineService.populateFeed('start', false).subscribe( res => {
      this.posts = res ;
      this._timelineService.updatePollTimestamp(res[0].timestamp);
      this._timelineService.pollProcess();
    });
    this._timelineService.$feedDestroyer.subscribe( data => this.removeFeedItem(data) );
    this._eventService.merger$.subscribe( trigger => this.mergeBuffer() );
    this._timelineService.timelineUpdate.subscribe( update => {
      if ( update.type === 'many' ) {
        this.postBuffer.unshift(...update.data);
        this._timelineService.updatePollTimestamp( this.postBuffer[0].timestamp );
        this._eventService.emitUnread(this.postBuffer.length);
      } else if ( update.type === 'single' ) {
        this.posts[_.findKey(this.posts, { 'ID': update.data.ID})] = update.data;
      }
    });
  }


  removeFeedItem(data) {
      let postIndex = null;
      switch ( data.type ) {
        case 'post':
          this.posts = this.posts.filter( post => { return post.ID !== data.targetID; });
          break;
        case 'comment':
          postIndex = _.findKey(this.posts, { 'ID': data.postID });
          this.posts[postIndex].response_count--;
          this.posts[postIndex].comments = this.posts[postIndex].comments.filter(
            comment => { return comment.ID !== data.targetID; }
          );
          break;
        case 'reply':
          postIndex = _.findKey(this.posts, { 'ID': data.postID });
          const post = this.posts[postIndex];
          this.posts[postIndex].response_count--;
          const commentIndex = _.findKey(post.comments, {'ID': data.commentID});
          this.posts[postIndex].comments[commentIndex].replies = this.posts[postIndex].comments[commentIndex].replies.filter(
            reply => { return reply.ID !== data.targetID; }
          );
          break;
      }
  }

  save(event) {
    this._timelineService.saveItem(event.text, event.attachments).subscribe( res => {
      if ( res.status === 200 ) {
        this.postBuffer.unshift(res.post);
        this._eventService.emitUnread(this.postBuffer.length);
        this._timelineService.updatePollTimestamp( this.postBuffer[0].timestamp );
      }
    });
  }

  mergeBuffer() {
    this.posts.unshift(...this.postBuffer);
    this.postBuffer = [];
    this._eventService.emitUnread(0);
  }
}
