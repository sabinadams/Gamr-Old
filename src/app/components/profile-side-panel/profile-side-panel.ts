import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'profile-side-panel',
  templateUrl: './profile-side-panel.html',
  styleUrls: ['./profile-side-panel.scss'],
})
export class ProfileSidePanelComponent implements OnInit{
 user = JSON.parse( localStorage.getItem( 'user' ) );

 constructor( private _eventService: EventService) {}

  ngOnInit() {
    this._eventService.postCountStream$.subscribe( update => {
      this.user.post_count = update;
    });
  }
}
