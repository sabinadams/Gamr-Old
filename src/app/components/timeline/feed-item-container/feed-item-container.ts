import { Component, OnInit, Input } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TimelineService } from '../shared/timeline-service';
// Break post grabbing/polling into a function called by the initiators
@Component({
  selector: 'feed-item-container',
  templateUrl: './feed-item-container.html',
  styleUrls: ['./feed-item-container.scss'],
  providers: [{provide: BsDropdownConfig, useValue: {autoClose: false}}]
})
export class FeedItemContainerComponent implements OnInit {
    @Input() post: any;
    regex: any;
    user = JSON.parse(localStorage.getItem('user'));
    constructor(
        private _timelineService: TimelineService
    ){}
    ngOnInit() {
        this.regex = new RegExp(`${this.post.uuid}`, 'g');
    }

    deleteItem(postID) {
       this._timelineService.emitDestroyItem('post', postID, null, null);
    }
}
