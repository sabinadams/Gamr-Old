import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';


@Component({
  selector: 'feed-item',
  templateUrl: './feed-item.html',
  styleUrls: ['./feed-item.scss'],
})
export class FeedItemComponent implements OnInit {
    @Input() post: any; // The post
    @Input() type: any; // Type of post "primary"(posts) or "sub" (comments/replies) 
    @Output() modalOpener = new EventEmitter(); // Emits an event that will call the modalOpen of the parent
    @Output() deleteItem = new EventEmitter(); // Emits an event that will call the deleteItem of the parent
    @Output() showInput = new EventEmitter(); // Emits an event that will call the showInput of the parent
    regex: any; // Will hold custom regex with post's UUID for dynamic content splitting
    user = JSON.parse(localStorage.getItem('user'));
    album = []; // Will hold images of the post
    constructor(
        private _lightboxConfig: LightboxConfig, 
        private _lightbox: Lightbox,
        private _timelineService: TimelineService
    ){}
    ngOnInit() {
        // Populates dynamic regex
        this.regex = new RegExp(`${this.post.uuid}`, 'g');
        this._lightboxConfig.wrapAround = true;
        this._lightboxConfig.fitImageInViewPort = true;
        // Populates lightbox album
        for ( const image of this.post.attachments.images ) {
            this.album.push({ src: image.URL });
        }
    }
    
    sendDeleteCommand() {
        this.deleteItem.emit(this.post.ID);
    }

    // Opens lightbox with album
    open(index: number, event): void {
        this._lightboxConfig.positionFromTop = event.pageY - (event.pageY/8)  - event.y + event.y / 4;
        this._lightbox.open(this.album, index);
    }

    showModal() {
        this.modalOpener.emit(true);
    }

    sendShowInput(){
        this.showInput.emit(true);
    }

}
