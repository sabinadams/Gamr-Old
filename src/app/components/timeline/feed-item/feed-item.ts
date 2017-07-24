import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TimelineService } from '../shared/timeline-service';
// Break post grabbing/polling into a function called by the initiators
@Component({
  selector: 'feed-item',
  templateUrl: './feed-item.html',
  styleUrls: ['./feed-item.scss'],
  providers: [{provide: BsDropdownConfig, useValue: {autoClose: false}}]
})
export class FeedItemComponent implements OnInit {
    @Input() post: any;
    @Output() modalOpener = new EventEmitter();
    regex: any;
    user = JSON.parse(localStorage.getItem('user'));
    constructor(
        private _timelineService: TimelineService
    ){}
    ngOnInit() {
        this.regex = new RegExp(`${this.post.uuid}`, 'g');
    }

    deleteItem(postID, commentID = null, replyID = null) {
        console.log(this.post)
    //    let type = 'post';
    //    if ( commentID ) {
    //         type = 'comment';
    //         if ( replyID ) { type = 'reply'; }
    //    }

    //    console.log(type, postID, commentID, replyID)
    //    this._timelineService.emitDestroyItem(type, postID, commentID || null, replyID || null);
    }

    showModal() {
        this.modalOpener.emit(true);
    }
}
