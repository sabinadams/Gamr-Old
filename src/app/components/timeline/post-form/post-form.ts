import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth-service';

@Component({
    selector: 'post-form',
    templateUrl: './post-form.html',
    styleUrls: ['./post-form.scss'],
})
export class PostFormComponent {
    @Output() onSave = new EventEmitter();
    @Output() closeMe = new EventEmitter();
    @Input() post: any = { text: '', attachments: [] };
    @Input() type = '';
    @Output() dataSync = new EventEmitter();
    user = JSON.parse(localStorage.getItem('user'));
    randID = this._authService._generateToken();
    @HostListener('keyup', ['$event']) onKeyup(event) {
        const textArea = document.getElementById(`post-form-input-${this.randID}`);
        textArea.style.overflow = 'hidden';
        textArea.style.height = '0px';
        textArea.style.height = textArea.scrollHeight + 'px';
    }

    constructor( private _authService: AuthService ){}

    save() {
        this.onSave.emit(this.post);
        this.post = { text: '', attachments: [] };
    }
    close() {
        this.closeMe.emit(false);
    }

    populateForm( text ) {
        this.post.text = text;
    }
}
