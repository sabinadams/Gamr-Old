import { Component, OnInit 	} from '@angular/core';
@Component({
  selector: 'profile-banner',
  templateUrl: './profile-banner.html',
  styles: [`
		.banner-profile {
		  padding-top:33%;
		  background: linear-gradient(to bottom, rgba(38, 42, 53, 0.25) 0%,#1e2335 90%), url('https://community.activision.com/eikmo72643/attachments/eikmo72643/more-games/20/1/ChivBlogHeader.jpg') center no-repeat;
		  background-size: cover;
		  min-height:400px;
		}
		
		.banner-profile-container {
		  height:320px;
		}
		.profile-pic {
		  height:200px;
		  width:auto;  
		  background-color:rgba(255,255,255,.1);
		  border:3px solid rgba(0,0,0,0.7);
		  box-shadow:0 0 10px rgba(0,0,0,0.8);
		  margin:auto;
		}
		.profile-pic-container {
		   position:absolute;
		   top:20%;
		   left: 50%;
		   transform: translate(-50%, 0);
		   text-align:center;
		}
		.nav.centered {
			text-align:center;
		}
	
		.nav-pills.centered > ul, .nav-pills.centered > li, .nav-pills.centered > li > a {
			height:80px;
			border-radius:0;
			margin:auto;
		}
		.nav-pills > li {
			float:none;
		    display:inline-block;
		    zoom:1; /* hasLayout ie7 trigger */
		    text-align:center;
			width:13%;
			font-size:15px;
		}
		.nav-pills.centered > li > a {
			padding-top:18px;
		}
		
		@media screen and (max-width: 300px) {
			.nav-pills{
			  display: flex;
			}
			.nav-pills > ul {
				width:100%;
			}
			.nav-pills > li {
				width: 10%;
			}
		}
  `]
})
export class ProfileBannerComponent implements OnInit{
	
	constructor(){}

	ngOnInit(){
		
	}
	
}
