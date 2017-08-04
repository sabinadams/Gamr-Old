import { Component, OnInit, Input } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'feed-modal',
  templateUrl: './feed-modal.html',
  styleUrls: ['./feed-modal.scss'],
})
export class FeedModalComponent implements OnInit {
    @Input() post: any;
    regex: any;
    user = JSON.parse(localStorage.getItem('user'));
    private formPopulate = new Subject<any>();
    constructor( private _timelineService: TimelineService ){}

    ngOnInit(){
      console.log(this.post);
    }

    deleteItem(postID, commentID, replyID, type) {
        this._timelineService.emitDestroyItem(type, postID, commentID, replyID);
    }

    saveComment( event ) {
        this._timelineService.saveItem(event.text, event.attachments, this.post.ID).subscribe( res => {
          if ( res.status === 200 ) { this.post.comments.unshift(res.post); }
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

    populateForm(i, event, UUID, text) {
        this.post.comments[i].commenting = event;
        setTimeout(() => {
          this.formPopulate.next({UUID: UUID, text: `@${text}`});
        }, 200);
    }

    getMoreResponses( index, itemID, isReplies ) {
      this._timelineService.getFeedResponses(index, this.post.ID, itemID, isReplies ).subscribe( res => {
        console.log(res)
        if ( !isReplies ) {
          console.log('Adding Comments')
          this.post.comments.push(...res);
        } else {
          console.log('Adding replies')
          const commentIndex = _.findKey(this.post.comments, { 'ID': itemID });
          this.post.comments[commentIndex].replies.push(...res);
        }
      });
    }
}
