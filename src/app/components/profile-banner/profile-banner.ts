import { Component, OnInit 	} from '@angular/core';
@Component({
  selector: 'profile-banner',
  templateUrl: './profile-banner.html',
  styles: [`
		.banner-profile {
		  width:100%;
		  height:80%;
		  padding-top:33%;
		  background: linear-gradient(to bottom, rgba(38, 42, 53, 0.25) 0%,#35353a 80%), url('https://awesomewallpaper.files.wordpress.com/2012/08/spirals_by_jindra12-d4m7vqm.jpg') center no-repeat;
		  background-size: cover;
		}
		.banner-profile-container {
		  height:300px;
		  width:100%;
		}
  `]
})
export class ProfileBannerComponent implements OnInit{
	
	constructor(){}

	ngOnInit(){
		
	}
	
}
