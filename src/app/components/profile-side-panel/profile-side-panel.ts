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
