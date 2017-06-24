import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { SocialService } from '../../../services/social-service';
import { Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';

@Component({
  selector: 'timeline-response',
  templateUrl: './timeline-response.html',
  styleUrls: ['../timeline-shared-styles.scss'],
})
export class TimelineResponseComponent implements OnInit{
  @Input() response: any;
  @Input() parentRelations = {postID: 0, commentID: 0};
  @Output() destroyObject = new EventEmitter();
  user = JSON.parse( localStorage.getItem('user') );
  new_comment: any;
  regex: any;
  constructor(
    private _lightboxConfig: LightboxConfig,
    private _lightbox: Lightbox,
    private _socialService: SocialService
   ) {}

  ngOnInit() {
    this._lightboxConfig.wrapAround = true;
    this._lightboxConfig.fitImageInViewPort = true;
    this.regex = new RegExp(`${this.response.uuid}`, 'g');
    this.new_comment = { text: '', images: [], video: '', postID: this.parentRelations.postID, commentID: this.parentRelations.commentID };
  }

  openImage(index: number, event): void {
    this._lightboxConfig.positionFromTop = event.pageY  - event.y + event.y / 4;
    this._lightbox.open(this.response.images, index);
  }

  saveComment(){
   if (this.new_comment.text.length > 0 || this.new_comment.images.length > 0 || this.new_comment.video.length > 0){
      this._socialService.savePost( this.new_comment ).subscribe( res => {
        this.new_comment = { text: '', images: [], video: '' };
        // this.postPull();
      });
    }
  }

}
