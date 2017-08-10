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
  // All Posts
  posts: any;
  // Posts waiting to be added to page
  postBuffer: any = [];
  // Toggled when you're loading more posts to prevent double-loading
  loadingMore = false;
  // Toggled when there are no more posts to load to prevent unnecessary calls to server
  endOfTime = false;

  // Checks if you've scrolled to the bottom of the page so it can load more posts
  @HostListener('window:scroll', ['$event']) checkPosition(event) {
    // Checks if you're at bottom
    if ((window.innerHeight + window.scrollY) >= event.target.scrollingElement.scrollHeight - 100) {
        // Do nothing if you're already loading more posts, or if there are no posts to load
        if ( this.loadingMore || this.endOfTime ) { return;  }
        // Otherwise, set the loadingMore flag to true
        this.loadingMore = true;
        // Grab more posts based on the oldest timestamp
        this._timelineService.populateFeed(
          this._timelineService.convertTimestamp(this.posts[this.posts.length - 1].timestamp), false
        ).subscribe( res => {
          // Populate the posts with the new posts and update the view. Update flags appropriately
          this.zone.run(() => {
            if ( res.length === 0 ) { this.endOfTime = true; }
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
    // Grab the first 10 posts to populate feed with
    this._timelineService.populateFeed('start', false).subscribe( res => {
      this.posts = res ; // Stores the posts
      this._timelineService.updatePollTimestamp(res[0].timestamp); // Tells service what timestamp to poll with
      this._timelineService.pollProcess(); // Starts the polling process
    });
    // Removes specific posts/comments/replies when told to
    this._timelineService.$feedDestroyer.subscribe( data => this.removeFeedItem(data) );
    // Merges the postBuffer with posts when told to
    this._eventService.merger$.subscribe( trigger => this.mergeBuffer() );
    // Updates postBuffer when given data
    this._timelineService.timelineUpdate.subscribe( update => {
      // If it was for a poll, put the new stuff in the poll and update polling flags
      if ( update.type === 'many' ) {
        this.postBuffer.unshift(...update.data); // Puts new posts in buffer
        this._timelineService.updatePollTimestamp( this.postBuffer[0].timestamp );// Tells service what timestamp to poll with
        this._eventService.emitUnread(this.postBuffer.length); // Updates the navbar unread indicator with unread count
      // Otherwise it was a post update that should automatically update the view
      } else if ( update.type === 'single' ) {
        // Updates the indicated post
        this.posts[_.findKey(this.posts, { 'ID': update.data.ID})] = update.data;
      }
    });
  }


  removeFeedItem( data ) {
      let postIndex = null;
      switch ( data.type ) {
        case 'post':
          // Removes specific post
          this.posts = this.posts.filter( post => { return post.ID !== data.targetID; });
          break;
        case 'comment':
          // Finds the post that owns the comment
          postIndex = _.findKey(this.posts, { 'ID': data.postID });
          // Decrements its response_count
          this.posts[postIndex].response_count--;
          // Filters out the comment
          this.posts[postIndex].comments = this.posts[postIndex].comments.filter(
            comment => { return comment.ID !== data.targetID; }
          );
          break;
        case 'reply':
          // Finds post the reply belongs to
          postIndex = _.findKey(this.posts, { 'ID': data.postID });
          const post = this.posts[postIndex];
          // Decrements response_count of the post
          this.posts[postIndex].response_count--;
          // Finds comment the reply belongs to
          const commentIndex = _.findKey(post.comments, {'ID': data.commentID});
          // Filters out the reply
          this.posts[postIndex].comments[commentIndex].replies = this.posts[postIndex].comments[commentIndex].replies.filter(
            reply => { return reply.ID !== data.targetID; }
          );
          break;
      }
  }


  save(event) {
    // Saves post to DB 
    this._timelineService.saveItem(event.text, event.attachments).subscribe( res => {
      // If successful
      if ( res.status === 200 ) {
        this.postBuffer.unshift(res.post); // Add new post to post buffer
        this._eventService.emitUnread(this.postBuffer.length); // Updates unread count on navbar
        this._timelineService.updatePollTimestamp( this.postBuffer[0].timestamp ); // Updates the polling time index
      }
    });
  }
  
  // Merges the buffer with the timeline
  mergeBuffer() {
    // For each post in the buffer, if the post existed already, replace it and move it to front. Otherwise it'll just add it to front
    for ( const newPost of this.postBuffer.reverse() ) {
      _.remove(this.posts, { ID: newPost.ID });
      this.posts.unshift(newPost);
    }
    // Clears post Buffer
    this.postBuffer = [];
    // Resets unread counts
    this._eventService.emitUnread( 0 );
  }
}
