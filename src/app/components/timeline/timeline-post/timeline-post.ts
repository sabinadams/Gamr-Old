import { Component, Input } from '@angular/core';

@Component({
  selector: 'timeline-post',
  templateUrl: './timeline-post.html',
  styleUrls: ['./timeline-post.css'],
})
export class TimelinePostComponent {

  constructor(){}

  @Input() post: any;

}
