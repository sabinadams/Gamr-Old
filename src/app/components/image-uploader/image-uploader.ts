import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from '../../services/image-service';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.html',
  styleUrls: ['./image-uploader.scss'],
})
export class ImageUploaderComponent {
  images = [];
  uploading = false;
  @Output() onUpload = new EventEmitter();
  constructor( private _imageService: ImageService ){}

  // Sends the image through a function whenever the file input is used
  imageHandler($event): void {
    if (this.images.length < 7 && $event.target.files[0] !== undefined) { this.saveImage($event.target); }
  }

  removeImage(i) {
    this.images.splice(i, 1);
  }
  // Converts file to base64
  // Try to add this to the image service. Promises will probably need to be applied
  saveImage(inputValue: any): void {
    this.uploading = true;
    const myReader = new FileReader();
    myReader.readAsDataURL(inputValue.files[0]);
    myReader.onloadend = (e) => {
      this._imageService.uploadImage(myReader.result).subscribe(res => {
        this.images.push(res.data.link);
        this.onUpload.next(this.images);
        // this.change( this.form.images, 'images' );
        this.uploading = false;
      });
    };
  }
}
