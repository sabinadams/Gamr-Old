import { Component, Input, OnInit, HostListener, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'post-form',
    templateUrl: './post-form.html',
    styleUrls: ['./post-form.scss'],
})
export class PostFormComponent implements OnInit {

    @Output() onSave = new EventEmitter(); // Passes the data to the parent to save
    @Output() closeMe = new EventEmitter();// Tells the parent to close the form
    @Input() postUUID: any; // UUID is used to make sure only the specified form gets populated  
    @Input() populateEvent: Subject<any>; // The event that populates the form automatically. Auto populate will basically tell all of the forms to populate with the given text. 
    @Input() type = ''; // If small, it will show a "Close button", otherwise it won't. Only main timeline input won't have that button
    @ViewChild('postForm') public postForm: any; // Reference to the postForm (  element with #postForm )
    post: any = { text: '', attachments: []}; 
    randID = this._authService._generateToken(); // Random ID used to ensure unique ID attribute on element

    constructor( private _authService: AuthService ){}

    ngOnInit() {
        // If this was created with a populate event
        if ( this.populateEvent ) {
            // Populate all postForms in existence
            this.populateEvent.subscribe( update => {
                // If the update's UUID matches this parent's feed-item UUID, update the form
                if ( update.UUID === this.postUUID ) {
                 this.populateForm(update.text);
                }
            });
        }
    }

    // Fires every key event
    @HostListener('keyup', ['$event']) onKeyup(event) {
        // ************Currently assumes anything matching the description of a tag is a valid tag. Need to add validation of tags so it highlights valid users only
        if ( !(event.which <= 90 && event.which >= 48)) { return; }
        // Splits the current contents of postForm at each @mention
        const values = this.postForm.nativeElement.innerText.split(/(\B@[a-z0-9_-]+)/gi);
        let fullText = ``;
        for ( const value of values) {
            // If was a mention, add an <a> tag with the mention, else add a span with the text
            fullText += value.match(/\B@[a-z0-9_-]+/gi) ? `<a class="mention">${value.trim()}</a>` : `<span>${value}</span>`;
            // Set the value of the form (a div) to have the dynamic HTML in fullText
            this.postForm.nativeElement.innerHTML = fullText;
            // Grabs the post form's reference by ID (so we can access DOM properties)
            const el = document.getElementById(this.randID); // Uses randID to ensure unique ID
            // Function that makes sure the cursor is at the end
            this.setEndOfContenteditable(el);
            // Trims spaces just in case
            this.post.text = el.innerText.trim();
        }
    }

    // Basically magically sets cursor to the end of contenteditable div with sub-tags in it
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

    // Triggers a save from the parent, passing along the new post data. Clears form
    save() {
        this.onSave.emit(this.post);
        this.post = { text: '', attachments: [] };
        this.postForm.nativeElement.innerText = '';
        this.postForm.nativeElement.innerHTML = '<span></span>';
        // ******Needs to tell image-uploader to clear images
    }

    close() {
        this.closeMe.emit(false);
    }
    
    // Populates the form with the provided text
    populateForm( text ) {
        this.post.text = text;
        this.postForm.nativeElement.innerText = text;
        this.postForm.nativeElement.innerHTML = `<a class="mention">${text}</a>`;
        this.setEndOfContenteditable(document.getElementById(this.randID));
    }

}
