import { Component, OnInit, Input } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
import * as _ from 'lodash';

@Component({
  selector: 'feed-modal',
  templateUrl: './feed-modal.html',
  styleUrls: ['./feed-modal.scss'],
})
export class FeedModalComponent implements OnInit {
    @Input() post: any;
    regex: any;
    user = JSON.parse(localStorage.getItem('user'));

    constructor(
        private _timelineService: TimelineService
    ){}

    ngOnInit(){
        // Not working for comments/replies because they have their own UUIDs. Maybe need to break them out.
        this.regex = new RegExp(`${this.post.uuid}`, 'g');
    }

    deleteItem(postID, commentID, replyID, type) {
        this._timelineService.emitDestroyItem(type, postID, commentID, replyID);
    }

    saveComment( event ) {
        this._timelineService.saveItem(event.text, event.attachments, this.post.ID).subscribe( res => {
          if ( res.status === 200 ) {
            // Find a way to automatically update the record on the timeline page
            this.post.comments.unshift(res.post);
          }
        });
    }

    saveReply( event, commentID ) {
        this._timelineService.saveItem(event.text, event.attachments, this.post.ID, commentID).subscribe( res => {
          if ( res.status === 200 ) {
            const commentIndex = _.findKey(this.post.comments, { 'ID': commentID });
            this.post.comments[commentIndex].replies
            ? this.post.comments[commentIndex].replies.unshift(res.post)
            : this.post.comments[commentIndex]['replies'] = [res.post];
          }
        });
    }
}
