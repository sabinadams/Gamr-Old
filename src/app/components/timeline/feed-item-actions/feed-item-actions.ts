import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';

@Component({
  selector: 'feed-item-actions',
  templateUrl: './feed-item-actions.html',
  styleUrls: ['./feed-item-actions.scss']
})
export class FeedItemActionsComponent implements OnInit {
    @Input() post: any; 
    @Output() startCommenting = new EventEmitter(); // Tells parent to open the comment box
    user = JSON.parse(localStorage.getItem('user'));
    constructor( private _timelineService: TimelineService ){}
    ngOnInit() {}
    likePost() {
      this._timelineService.likeFeedItem( this.post.ID ).subscribe( res => {
        if ( res.status === 200 ) {
          this.post.liked = !this.post.liked;
          if ( !this.post.liked ) {
            this.post.likes = this.post.likes.filter(like => { return like !== this.user.ID;});
          } else {
            this.post.likes.push( this.user.ID );
          }
        }
        // Update the main timeline's record for this post to show the updated like count
        this._timelineService.timelineUpdate.next( {type: 'single', data: this.post} );
      });
    }
    
    openInput() {
      this.startCommenting.emit(true);
    }
}
