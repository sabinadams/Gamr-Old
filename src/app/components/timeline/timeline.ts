import { Component, OnInit } from '@angular/core';
// import { NgZone } from '@angular/core';
import { TimelineService } from './shared/timeline-service';
import * as _ from 'lodash';

// Break post grabbing/polling into a function called by the initiators
@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TimelineComponent implements OnInit {
  posts: any;
  constructor( private _timelineService: TimelineService ){}

  ngOnInit() {
    this._timelineService.populateFeed('start', false).subscribe( res => { this.posts = res; });
    this._timelineService.$feedDestroyer.subscribe( data => { this.removeFeedItem(data); });
  }

  removeFeedItem(data) {
      let postIndex = null;
      switch ( data.type ) {
        case 'post':
          this.posts = this.posts.filter( post => { return post.ID !== data.targetID; });
          break;
        case 'comment':
          postIndex = _.findKey(this.posts, { 'ID': data.postID });
          this.posts[postIndex].comments = this.posts[postIndex].comments.filter(
            comment => { return comment.ID !== data.targetID;}
          );
          break;
        case 'reply':
          postIndex = _.findKey(this.posts, { 'ID': data.postID });
          const post = this.posts[postIndex];
          const commentIndex = _.findKey(post.comments, {'ID': data.commentID});
          this.posts[postIndex].comments[commentIndex].replies = this.posts[postIndex].comments[commentIndex].replies.filter(
            reply => { return reply.ID !== data.targetID; }
          );
          break;
      }
  }
  
}
