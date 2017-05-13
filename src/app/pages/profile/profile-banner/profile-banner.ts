import { Component, OnInit 	} from '@angular/core';
declare var $: any;
@Component({
  selector: 'profile-banner',
  templateUrl: './profile-banner.html',
  styleUrls: ['./profile-banner.scss'],
})
export class ProfileBannerComponent implements OnInit{
	
	user= JSON.parse(localStorage.getItem("user"));
	
	constructor(){}

	ngOnInit(){
		$(function(){
		  var $ppc = $('.progress-pie-chart');
		  var percent = parseInt($ppc.data('percent'));
		  var deg = 360*percent/100;
		  if (percent > 50) {
		    $ppc.addClass('gt-50');
		  }
		  $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
		  
		});
	}
	
}
