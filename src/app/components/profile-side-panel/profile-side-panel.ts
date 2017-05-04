import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile-side-panel',
  templateUrl: './profile-side-panel.html',
  styleUrls: ['./profile-side-panel.scss'],
})
export class ProfileSidePanelComponent {

	user = JSON.parse( localStorage.getItem( 'user' ) );

}
