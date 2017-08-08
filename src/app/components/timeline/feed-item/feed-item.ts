import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';

// Break post grabbing/polling into a function called by the initiators
@Component({
  selector: 'feed-item',
  templateUrl: './feed-item.html',
  styleUrls: ['./feed-item.scss'],
})
export class FeedItemComponent implements OnInit {
    @Input() post: any;
    @Input() type: any;
    @Output() modalOpener = new EventEmitter();
    @Output() deleteItem = new EventEmitter();
    @Output() showInput = new EventEmitter();
    regex: any;
    user = JSON.parse(localStorage.getItem('user'));
    album = [];
    constructor(
        private _el: ElementRef, private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox,
        private _timelineService: TimelineService
    ){}
    ngOnInit() {
        this.regex = new RegExp(`${this.post.uuid}`, 'g');
        this._lightboxConfig.wrapAround = true;
        this._lightboxConfig.fitImageInViewPort = true;
        for ( const image of this.post.attachments.images ) {
            this.album.push({ src: image.URL });
        }

    }

    sendDeleteCommand() {
        this.deleteItem.emit(this.post.ID);
    }

    open(index: number, event): void {
        this._lightboxConfig.positionFromTop = event.pageY - (event.pageY/8)  - event.y + event.y / 4;
        this._lightbox.open(this.album, index);
      }

    showModal() {
        this.modalOpener.emit(true);
    }

    sendShowInput(){
        console.log('sending command from item to page')
        this.showInput.emit(true);
    }

}
