import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social-service';
import { EventService } from '../../services/event-service';
import { ImageService } from '../../services/image-service';

declare var $: any;
@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TimelineComponent implements OnInit {
  user = JSON.parse( localStorage.getItem('user') );
  rows: number = 1;
  new_post = { text: '', images: [], video: '' };
  uploading: boolean = false;
  posts = [];
  post_buffer = [];

  constructor( private _socialService: SocialService, private _eventService: EventService, private _imageService: ImageService ){
    _eventService.merger$.subscribe( trigger => {
      if( trigger ) this.mergeBuffer();
    });
  }

  ngOnInit() {
    this._socialService.getPosts( 0 ).subscribe( res => {
      this.posts = res;
      setInterval( () => { this.postPull(); }, 20000);
    });
  }

  postPull() {
    this._socialService.postPull( this.convertTimestamp(this.post_buffer.length ? this.post_buffer[0].timestamp : this.posts[0].timestamp) ).subscribe( res => {
      if( res.length > 0 ){
        /* 
          Had to make the buffer merge complicated like this to account for a very edge-case bug
          where someone using two computers at the same time could sometimes cause a post
          to show up twice in the timeline.
          Previous code: 
            this.post_buffer.unshift(...res);
        */
        for(let post of res) {
          for(let i = 0; i < this.post_buffer.length; i++)
            if(this.post_buffer[i].ID == post.ID) 
              this.post_buffer.splice(i, 1);
          this.post_buffer.unshift(post);
        }
        this._eventService.emitUnread(this.post_buffer.length);
      }
    });
  }
  
  savePost() {
    if(this.new_post.text.length > 0 || this.new_post.images.length > 0 || this.new_post.video.length > 0){
      this._socialService.savePost( this.new_post ).subscribe( res => {
        this.new_post = { text: '', images: [], video: '' };
        this.postPull();
      });
    }
  }

  mergeBuffer() {
    for(let post of this.post_buffer)
        if(document.getElementById(`ngpost-${post.ID}`)) 
          document.getElementById(`ngpost-${post.ID}`).remove();
    this.posts.unshift(...this.post_buffer);
    this.post_buffer = [];
    this._eventService.emitUnread(this.post_buffer.length);
  }

  convertTimestamp(timestamp){
    let date = new Date(timestamp).toISOString();
    return date.substring(0, date.indexOf('.')).replace('T', ' ').replace('Z', '');
  }

  //Sends the image through a function whenever the file input is used
  imageHandler($event): void {
    if(this.new_post.images.length < 7 && $event.target.files[0] != undefined)
      this.saveImage($event.target);
  }

  //Converts file to base64
  //Try to add this to the image service. Promises will probably need to be applied
  saveImage(inputValue: any): void {
    this.uploading = true;
    let file:File = inputValue.files[0];
    let myReader:FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      let newimage = myReader.result;
      this._imageService.uploadImage(newimage).subscribe(res => {
        this.new_post.images.push(res.data.link);
        this.uploading = false;
      });
    }
  }

  removeImage(i){ this.new_post.images.splice(i, 1); }

  checkBlur(){ if( this.new_post.text.length < 1 ) this.rows = 1; }

}
