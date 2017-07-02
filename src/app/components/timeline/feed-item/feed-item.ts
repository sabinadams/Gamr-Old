import { Component, OnInit, Input } from '@angular/core';
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
