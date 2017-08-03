import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TimelineService } from '../shared/timeline-service';
import { ModalDirective } from 'ngx-bootstrap/modal';

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
    modalShow = false;
    user = JSON.parse(localStorage.getItem('user'));
    @ViewChild('lgModal') public lgModal: ModalDirective;
    constructor(
        private _timelineService: TimelineService
    ){}
    ngOnInit() {
        this.regex = new RegExp(`${this.post.uuid}`, 'g');
    }
    openModal() {
        this.modalShow = true;
        this.lgModal.show();
    }
    deleteItem(postID) {
       this._timelineService.emitDestroyItem('post', postID, null, null);
    }
}
