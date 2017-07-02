import { Component, OnInit, Input } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';

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
        this.regex = new RegExp(`${this.post.uuid}`, 'g');
    }

    deleteItem(type, postID, commentID = null, replyID = null) {
        this._timelineService.emitDestroyItem(type, postID, commentID, replyID);
    }

}
