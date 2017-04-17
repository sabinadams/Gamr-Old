import { Component, Input } from '@angular/core';

@Component({
  selector: 'timeline-comment',
  templateUrl: './timeline-comment.html',
  styleUrls: ['./timeline-comment.css'],
})
export class TimelineCommentComponent {

  constructor(){}

  @Input() comment: any;

}
