import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social-service';
import { EventService } from '../../services/event-service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TimelineComponent implements OnInit {
  user = JSON.parse( localStorage.getItem('user') );
  new_post = { text: '', images: [], video: '' };
  posts = [];
  post_buffer = [];
  loading = false;
  end = false;
  constructor(
    private _socialService: SocialService,
    private _eventService: EventService,
    private lc: NgZone
  ){
    window.onscroll = () => {
      lc.run(() => {
        const windowHeight = 'innerHeight' in window ? window.innerHeight
             : document.documentElement.offsetHeight;
         const body = document.body, html = document.documentElement;
         const docHeight = Math.max(body.scrollHeight,
             body.offsetHeight, html.clientHeight,
             html.scrollHeight, html.offsetHeight);
         const windowBottom = windowHeight + window.pageYOffset;
         if (windowBottom >= docHeight && !this.loading) {
           this.loading = true;
           this.end = false;
           this._socialService.getPosts( this.posts.length ).subscribe( res => {
             this.end = res.length > 0 ? false : true;
             this.loading = false;
             this.posts.push(...res);
           });
         }
      });
    };
    _eventService.merger$.subscribe( trigger => {
      if ( trigger ) { this.mergeBuffer(); };
    });
  }

  ngOnInit() {
    this._socialService.getPosts( 0 ).subscribe( res => {
      this.posts = res;
      setInterval( () => { this.postPull(); }, 20000);
    });
  }

  postPull() {
    if (this.posts.length){
      this._socialService.postPull(
        this.convertTimestamp(
          this.post_buffer.length
          ? this.post_buffer[0].timestamp
          : this.posts[0].timestamp
        )
      ).subscribe( res => {
        if ( res.length > 0 ) {
          for (const post of res) {
            for (let i = 0; i < this.post_buffer.length; i++) {
              if (this.post_buffer[i].ID === post.ID) {
                this.post_buffer.splice(i, 1);
              }
            }
            this.post_buffer.unshift(post);
          }
          this._eventService.emitUnread(this.post_buffer.length);
        }
      });
    } else {
      this._socialService.getPosts( 0 ).subscribe( res => {
        this.post_buffer.unshift(...res);
        this._eventService.emitUnread(this.post_buffer.length);
      });
    }
  }

  savePost() {
    if (this.new_post.text.length > 0 || this.new_post.images.length > 0 || this.new_post.video.length > 0){
      this._socialService.savePost( this.new_post ).subscribe( res => {
        this.new_post = { text: '', images: [], video: '' };
        this.postPull();
      });
    }
  }

  mergeBuffer() {
    for (const post of this.post_buffer){
      if (document.getElementById(`ngpost-${post.ID}`)) {
        document.getElementById(`ngpost-${post.ID}`).remove();
      }
    }
    this.posts.unshift(...this.post_buffer);
    this.post_buffer = [];
    this._eventService.emitUnread(this.post_buffer.length);
  }

  convertTimestamp(timestamp){
    const date = new Date(timestamp).toISOString();
    return date.substring(0, date.indexOf('.')).replace('T', ' ').replace('Z', '');
  }


  handleDestroyPost($event) {
    this.posts = this.posts.filter(( post ) => { return post.ID !== $event; });
  }



}
