import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SocialService } from '../../../services/social-service';
import { Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';

@Component({
  selector: 'timeline-comment',
  templateUrl: './timeline-comment.html',
  styleUrls: ['./timeline-comment.scss'],
})
export class TimelineCommentComponent implements OnInit{
  @Input() comment: any;
  @Output() destroyObject = new EventEmitter();
  user = JSON.parse( localStorage.getItem('user') );
  regex: any;
  constructor( private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox, private _socialService: SocialService ) {}

  ngOnInit() {
    this._lightboxConfig.wrapAround = true;
    this._lightboxConfig.fitImageInViewPort = true;
    this.regex = new RegExp(`${this.comment.uuid}`, 'g');
  }

  likeComment() {
    this._socialService.likePost( this.comment.ID ).subscribe( res => {
      this.comment.liked = res.STATUS === 200 ? true : false;
      if ( res.LIKED ) {
        this.comment.liked = true;
        this.comment.likes++;
      } else {
        this.comment.liked = false;
        this.comment.likes--;
      }
    });
  }

  deleteComment() {
   this._socialService.deletePost( this.comment.ID ).subscribe( res => {
    this.destroyObject.emit(this.comment.ID);
   });
  }

  openImage(index: number, event): void {
    this._lightboxConfig.positionFromTop = event.pageY  - event.y + event.y / 4;
    this._lightbox.open(this.comment.images, index);
  }
  
}
