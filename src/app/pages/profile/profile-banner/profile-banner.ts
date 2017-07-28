import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../../services/event-service';
@Component({
  selector: 'profile-banner',
  templateUrl: './profile-banner.html',
  styleUrls: ['./profile-banner.scss'],
})
export class ProfileBannerComponent implements OnInit {
  @Input() user: any = [];

  constructor( private _eventService: EventService) {}

  ngOnInit() {
    this._eventService.postCountStream$.subscribe( update => {
      this.user.post_count = update;
    });
  }
}
