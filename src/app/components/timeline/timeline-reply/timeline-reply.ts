import { Component, Input } from '@angular/core';

@Component({
  selector: 'timeline-reply',
  templateUrl: './timeline-reply.html',
  styleUrls: ['./timeline-reply.css'],
})
export class TimelineReplyComponent {

  constructor(){}

  @Input() reply: any;

}
