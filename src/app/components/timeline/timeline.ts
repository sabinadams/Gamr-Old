import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social-service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TimelineComponent implements OnInit {
  rows: number = 1;
  new_post = {
    text: '',
    images: [],
    video: ''
  };

  posts = [];
  

  constructor( private _socialService: SocialService ){}

  ngOnInit() {
    this._socialService.getPosts( 0 ).subscribe( res => {
      this.posts = res;
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

}
