import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'timeline-comment',
  templateUrl: './timeline-comment.html',
  styleUrls: ['./timeline-comment.scss'],
})
export class TimelineCommentComponent implements OnInit{
  @Input() comment: any;
  @Output() destroyObject = new EventEmitter();
  constructor( ) {}

  ngOnInit() {
  }
}
