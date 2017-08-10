import { Component, Input, ViewChild } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'feed-item-container',
  templateUrl: './feed-item-container.html',
  styleUrls: ['./feed-item-container.scss']
})
export class FeedItemContainerComponent {
    @Input() post: any;
    // When toggled from true to false, it kills DOM processes related to modal
    modalShow = false;
    // Reference to modal
    @ViewChild('lgModal') public lgModal: ModalDirective;
    constructor( private _timelineService: TimelineService ){}
    
    // Opens modal and allows DOM rendering
    openModal() {
        this.modalShow = true;
        this.lgModal.show();
    }
    
    // Sends destroy item event to remove timeline item
    deleteItem(postID) {
       this._timelineService.emitDestroyItem('post', postID, null, null);
    }
}
