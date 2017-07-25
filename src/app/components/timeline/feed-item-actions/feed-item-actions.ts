import { Component, OnInit, Input } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
// Break post grabbing/polling into a function called by the initiators
@Component({
  selector: 'feed-item-actions',
  templateUrl: './feed-item-actions.html',
  styleUrls: ['./feed-item-actions.scss']
})
export class FeedItemActionsComponent implements OnInit {
    @Input() post: any;
    user = JSON.parse(localStorage.getItem('user'));
    constructor( private _timelineService: TimelineService ){}
    ngOnInit() {}

    likePost() {
      this._timelineService.likeFeedItem( this.post.ID ).subscribe( res => {
        // If it worked, update the "liked" status of the post on the timeline.ts file
      });
    }
}
