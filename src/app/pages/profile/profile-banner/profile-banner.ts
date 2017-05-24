import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'profile-banner',
  templateUrl: './profile-banner.html',
  styleUrls: ['./profile-banner.scss'],
})
export class ProfileBannerComponent implements OnInit{
	
	constructor(){}

	@Input() user: any = [];

	ngOnInit(){
		
	}
	
}
