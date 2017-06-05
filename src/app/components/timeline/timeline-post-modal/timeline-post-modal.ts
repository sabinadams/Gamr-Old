import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { SocialService } from '../../../services/social-service';
import { ImageService } from '../../../services/image-service';
import { Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';

@Component({
  selector: 'timeline-post-modal',
  templateUrl: './timeline-post-modal.html',
  styleUrls: ['./timeline-post-modal.scss']
})
export class TimelinePostModal implements OnInit{
  @Input() post: any;
  @Output() destroyPost = new EventEmitter();
  user = JSON.parse( localStorage.getItem('user') );
  new_post = { text: '', images: [], video: '' };
  regex: any;
  uploading = false;
  constructor(
    private _imageService: ImageService,
    private _lightboxConfig: LightboxConfig,
    private _lightbox: Lightbox,
    private _socialService: SocialService
  ) {}

  ngOnInit() {
    this._lightboxConfig.wrapAround = true;
    this._lightboxConfig.fitImageInViewPort = true;
    this.regex = new RegExp(`${this.post.uuid}`, 'g');
  }

  likePost() {
    this._socialService.likePost( this.post.ID ).subscribe( res => {
      this.post.liked = res.STATUS === 200 ? true : false;
      if ( res.LIKED ) {
        this.post.liked = true;
        this.post.likes++;
      } else {
        this.post.liked = false;
        this.post.likes--;
      }
    });
  }

  deletePost() {
   this._socialService.deletePost( this.post.ID ).subscribe( res => {
    this.destroyPost.emit(this.post.ID);
   });
  }

  openImage(index: number, event): void {
    this._lightboxConfig.positionFromTop = event.pageY  - event.y + event.y / 4;
    this._lightbox.open(this.post.images, index);
  }

  // Sends the image through a function whenever the file input is used
  imageHandler($event): void {
    if (this.new_post.images.length < 7 && $event.target.files[0] !== undefined) {
      this.saveImage($event.target);
    }
  }

  // Converts file to base64
  // Try to add this to the image service. Promises will probably need to be applied
  saveImage(inputValue: any): void {
    this.uploading = true;
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      const newimage = myReader.result;
      this._imageService.uploadImage(newimage).subscribe(res => {
        this.new_post.images.push(res.data.link);
        this.uploading = false;
      });
    };
  }

  removeImage(i) { this.new_post.images.splice(i, 1); }

}
