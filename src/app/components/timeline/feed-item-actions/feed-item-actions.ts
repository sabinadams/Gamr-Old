import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
// Break post grabbing/polling into a function called by the initiators
@Component({
  selector: 'feed-item-actions',
  templateUrl: './feed-item-actions.html',
  styleUrls: ['./feed-item-actions.scss']
})
export class FeedItemActionsComponent implements OnInit {
    @Input() post: any;
    @Output() startCommenting = new EventEmitter();
    user = JSON.parse(localStorage.getItem('user'));
    constructor( private _timelineService: TimelineService ){}
    ngOnInit() {}

    likePost() {
      this._timelineService.likeFeedItem( this.post.ID ).subscribe( res => {
        if ( res.status === 200 ) {
          this.post.liked = !this.post.liked;
          if ( !this.post.liked ) {
            this.post.likes = this.post.likes.filter(like => {
              return like !== this.user.ID;
            });
          } else {
            this.post.likes.push( this.user.ID );
          }
        }
        this._timelineService.timelineUpdate.next( {type: 'single', data: this.post} );
      });
    }

    openInput() {
      console.log('Sending command from actions to item')
      this.startCommenting.emit(true);
    }
}
