import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social-service';
import { EventService } from '../../services/event-service';
declare var $: any;
@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TimelineComponent implements OnInit {
  user = JSON.parse( localStorage.getItem('user') );
  rows: number = 1;
  new_post = {
    text: '',
    images: [],
    video: ''
  };

  posts = [];
  
  post_cache = [];

  constructor( private _socialService: SocialService, private _eventService: EventService ){
    _eventService.merger$.subscribe( trigger => {
      if( trigger ) this.mergeCache();
    });
  }

  ngOnInit() {
    this._socialService.getPosts( 0 ).subscribe( res => {
      this.posts = res;
      setInterval( () => {
        this._socialService.postPull( this.convertTimestamp(this.post_cache.length ? this.post_cache[0].timestamp : this.posts[0].timestamp) ).subscribe( res => {
          if( res.length > 0 ){
            this.post_cache.unshift(...res);
            this._eventService.emitUnread(this.post_cache.length);
          }
        });
      }, 15000)
    });
  }

  checkBlur(){
    if(this.new_post.text.length < 1){
      this.rows = 1;
    }
  }

  savePost() {
    if(this.new_post.text.length > 0 || this.new_post.images.length > 0 || this.new_post.video.length > 0){
      this._socialService.savePost( this.new_post ).subscribe( res => {
        this.new_post = { text: '', images: [], video: '' };
      });
    }
  }

  mergeCache() {
    this.posts.unshift(...this.post_cache);
    this.post_cache = [];
    this._eventService.emitUnread(this.post_cache.length);
  }

  convertTimestamp(timestamp){
    let date = new Date(timestamp).toISOString();
    return date.substring(0, date.indexOf('.')).replace('T', ' ').replace('Z', '');
  }
}
