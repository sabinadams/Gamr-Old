import { Component, Input, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'profile-side-panel',
  templateUrl: './profile-side-panel.html',
  styleUrls: ['./profile-side-panel.scss'],
})
export class ProfileSidePanelComponent {

	user = JSON.parse( localStorage.getItem( 'user' ) );

	ngOnInit(){
	}
}
