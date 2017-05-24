import { Component, Input, OnInit,  ElementRef } from '@angular/core';
import { SocialService } from '../../../services/social-service';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';

declare var $: any;
@Component({
  selector: 'timeline-post',
  templateUrl: './timeline-post.html',
  styleUrls: ['./timeline-post.scss'],
})
export class TimelinePostComponent implements OnInit{
  user = JSON.parse( localStorage.getItem('user') );

  constructor( private _el: ElementRef, private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox, private _router: Router, private _socialService: SocialService, private _authService: AuthService ){  }

  @Input() post: any;
  regex: any;
  ngOnInit() {
    this._lightboxConfig.wrapAround = true
    this._lightboxConfig.fitImageInViewPort = true


    console.log(this.post)
    this.regex = new RegExp(`${this.post.uuid}`, 'g');
    $('#post-text>span>a').click((evt) => {
        evt.preventDefault();
        this._router.navigate(['/u', evt.target.innerText.substring(1).trim()]);
    });
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

  open(index: number, event): void {
    this._lightboxConfig.positionFromTop = event.pageY  - event.y + event.y/4;
    this._lightbox.open(this.post.images, index);
  }
}
