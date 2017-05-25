import { Component, Input } from '@angular/core';
@Component({
  selector: 'profile-banner',
  templateUrl: './profile-banner.html',
  styleUrls: ['./profile-banner.scss'],
})
export class ProfileBannerComponent {
	@Input() user: any = [];
}
