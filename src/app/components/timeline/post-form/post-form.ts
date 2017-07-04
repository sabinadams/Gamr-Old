import { Component, OnInit, HostListener } from '@angular/core';
// import { NgZone } from '@angular/core';
import { TimelineService } from '../shared/timeline-service';
import * as _ from 'lodash';

// Break post grabbing/polling into a function called by the initiators
@Component({
    selector: 'post-form',
    templateUrl: './post-form.html',
    styleUrls: ['./post-form.scss'],
})
export class PostFormComponent implements OnInit {
    user = JSON.parse(localStorage.getItem('user'));
    @HostListener('keyup', ['$event']) onKeyup(event) {
        const textArea = document.getElementById('post-form-input');
        textArea.style.overflow = 'hidden';
        textArea.style.height = '0px';
        textArea.style.height = textArea.scrollHeight + 'px';
    }

    constructor( private _timelineService: TimelineService ){}
    ngOnInit() {}

}
