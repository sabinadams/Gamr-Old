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
  @Output() destroyObject = new EventEmitter();
  user = JSON.parse( localStorage.getItem('user') );
  new_comment = { text: '', images: [], video: '' };
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
  }

  openImage(index: number, event): void {
    this._lightboxConfig.positionFromTop = event.pageY  - event.y + event.y / 4;
    this._lightbox.open(this.response.images, index);
  }

  saveComment(){
    console.log("Saving Comment: " + JSON.stringify(this.new_comment));
  }
}
