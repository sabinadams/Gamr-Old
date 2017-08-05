import { Component, Input, OnInit, HostListener, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Subject } from 'rxjs/Subject';
@Component({
    selector: 'post-form',
    templateUrl: './post-form.html',
    styleUrls: ['./post-form.scss'],
})
export class PostFormComponent implements OnInit {
    // Can add logic inside the regex check to only turn it into a link if it's a valid User
    @Output() onSave = new EventEmitter();
    @Output() closeMe = new EventEmitter();
    @Input() postUUID: any;
    @Input() populateEvent: Subject<any>;
    @Input() type = '';
    @ViewChild('postForm') public postForm: any;
    post: any = { text: '', attachments: {
        images: []
    } };
    user = JSON.parse(localStorage.getItem('user'));
    randID = this._authService._generateToken();

    constructor( private _authService: AuthService ){}

    ngOnInit() {
        if ( this.populateEvent ) {
            this.populateEvent.subscribe( update => {
                if ( update.UUID === this.postUUID ) {
                 this.populateForm(update.text);
                }
            });
        }
    }

    @HostListener('keyup', ['$event']) onKeyup(event) {
        // Currently assumes anything matching the description of a tag is a valid tag
        if ( !(event.which <= 90 && event.which >= 48)) { return; }
        const values = this.postForm.nativeElement.innerText.split(/(\B@[a-z0-9_-]+)/gi);
        let fullText = ``;
        for ( const value of values) {
            fullText += value.match(/\B@[a-z0-9_-]+/gi) ? `<a class="mention">${value.trim()}</a>` : `<span>${value}</span>`;
            this.postForm.nativeElement.innerHTML = fullText;
            const el = document.getElementById(this.randID);
            this.setEndOfContenteditable(el);
            this.post.text = el.innerText.trim();
        }
    }

    setEndOfContenteditable(contentEditableElement) {
        let range;
        let selection;
        if (document.createRange) {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
    }

    save() {
        this.onSave.emit(this.post);
        this.post = { text: '', attachments: [] };
        this.postForm.nativeElement.innerText = '';
        this.postForm.nativeElement.innerHTML = '<span></span>';
    }

    close() {
        this.closeMe.emit(false);
    }

    populateForm( text ) {
        this.post.text = text;
        this.postForm.nativeElement.innerText = text;
        this.postForm.nativeElement.innerHTML = `<a class="mention">${text}</a>`;
        this.setEndOfContenteditable(document.getElementById(this.randID));
    }

}
