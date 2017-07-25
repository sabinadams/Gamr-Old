import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
// Break post grabbing/polling into a function called by the initiators
@Component({
  selector: 'feed-item',
  templateUrl: './feed-item.html',
  styleUrls: ['./feed-item.scss'],
})
export class FeedItemComponent implements OnInit {
    @Input() post: any;
    @Output() modalOpener = new EventEmitter();
    @Output() deleteItem = new EventEmitter();
    regex: any;
    user = JSON.parse(localStorage.getItem('user'));
    constructor(
        private _timelineService: TimelineService
    ){}
    ngOnInit() {
        this.regex = new RegExp(`${this.post.uuid}`, 'g');
    }

    sendDeleteCommand() {
        this.deleteItem.emit(this.post.ID);
    }

    showModal() {
        this.modalOpener.emit(true);
    }
}
