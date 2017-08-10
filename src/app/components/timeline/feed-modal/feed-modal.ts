import { Component, Input } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'feed-modal',
  templateUrl: './feed-modal.html',
  styleUrls: ['./feed-modal.scss'],
})
export class FeedModalComponent {
    @Input() post: any;
    private formPopulate = new Subject<any>();
    constructor( private _timelineService: TimelineService ){}

    // Sends event that will remove the specified feed-item
    deleteItem(postID, commentID, replyID, type) {
        this._timelineService.emitDestroyItem(type, postID, commentID, replyID);
    }
  
    // Comments on post
    saveComment( event ) {
        this._timelineService.saveItem(event.text, event.attachments, this.post.ID).subscribe( res => {
          if ( res.status === 200 ) { this.post.comments.unshift(res.post); }
        });
    }

    // Replies to comment
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
  
    // Opens the specified form, then populates the form. Waits 200ms just in case it took a little bit to open the form
    populateForm(i, event, UUID, text) {
        this.post.comments[i].commenting = event;
        setTimeout(() => {
          this.formPopulate.next({UUID: UUID, text: `@${text}`});
        }, 200);
    }

    // Loads more responses for desired item of desired type, then appends it to its appropriate list of feed items
    getMoreResponses( index, itemID, isReplies ) {
      this._timelineService.getFeedResponses(index, this.post.ID, itemID, isReplies ).subscribe( res => {
        console.log(res)
        if ( !isReplies ) {
          this.post.comments.push(...res);
        } else {
          const commentIndex = _.findKey(this.post.comments, { 'ID': itemID });
          this.post.comments[commentIndex].replies.push(...res);
        }
      });
    }
}
