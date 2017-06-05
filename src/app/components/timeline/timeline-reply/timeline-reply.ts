import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'timeline-reply',
  templateUrl: './timeline-reply.html',
  styleUrls: ['./timeline-reply.scss'],
})
export class TimelineReplyComponent implements OnInit{
  @Input() reply: any;
  @Output() destroyObject = new EventEmitter();
  constructor( ) {}

  ngOnInit() {
  }
}
