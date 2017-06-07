import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from '../../../services/image-service';

@Component({
  selector: 'timeline-form',
  templateUrl: './timeline-form.html',
  styleUrls: ['./timeline-form.scss']
})

export class TimelineFormComponent {
    @Input() form: any;
    @Output() update = new EventEmitter();
    @Output() submitData = new EventEmitter();
    user = JSON.parse( localStorage.getItem('user') );
    uploading = false;
    rows = 1;
    constructor(private _imageService: ImageService){}

    change( data, key: string ) {
        this.form[key] = data;
        this.update.emit(this.form);
    }

    // Sends the image through a function whenever the file input is used
  imageHandler($event): void {
    if (this.form.images.length < 7 && $event.target.files[0] !== undefined) {
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
        this.form.images.push(res.data.link);
        this.change( this.form.images, 'images' );
        this.uploading = false;
      });
    };
  }

  submit() { this.submitData.emit();}
  removeImage(i) { this.form.images.splice(i, 1); }
  checkBlur() { if ( this.form.text.length < 1 ) {this.rows = 1; } }

}
