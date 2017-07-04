import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'post-form',
    templateUrl: './post-form.html',
    styleUrls: ['./post-form.scss'],
})
export class PostFormComponent {
    @Output() onSave = new EventEmitter();
    @Input() post: any = { text: '', attachments: [] };
    @Output() dataSync = new EventEmitter();
    user = JSON.parse(localStorage.getItem('user'));

    @HostListener('keyup', ['$event']) onKeyup(event) {
        const textArea = document.getElementById('post-form-input');
        textArea.style.overflow = 'hidden';
        textArea.style.height = '0px';
        textArea.style.height = textArea.scrollHeight + 'px';
    }

    constructor(){}

    save() {
        this.onSave.emit(this.post);
        this.post = { text: '', attachments: [] };
    }
}
