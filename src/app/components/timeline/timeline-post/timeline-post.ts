import { Component, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { SocialService } from '../../../services/social-service';
declare var lightbox: any;
@Component({
  selector: 'timeline-post',
  templateUrl: './timeline-post.html',
  styleUrls: ['./timeline-post.scss'],
})
export class TimelinePostComponent {
  user = JSON.parse( localStorage.getItem('user') );

  constructor( private _socialService: SocialService, private domSanitizer:DomSanitizer ){
    lightbox.option({
      'resizeDuration': 300,
      'wrapAround': true,
      'disableScrolling': true,
      'alwaysShowNavOnTouchDevices': true
    })
  }

  @Input() post: any;
  
  getPostText() {
    //return this.domSanitizer.bypassSecurityTrustHtml(this.post.text);
    return this.post.text;
  }

  likePost() {
  	this._socialService.likePost( this.post.ID ).subscribe( res => {
  		this.post.liked = res.STATUS == 200 ? true : false;
  		if( res.LIKED ) {
  			this.post.liked = true;
  			this.post.likes++;
  		} else {
  			this.post.liked = false;
  			this.post.likes--;
  		}
  	});
  }
}
