import { Component, OnInit } from '@angular/core';
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
  constructor( private _timelineService: TimelineService ){}

  ngOnInit() {}

}
