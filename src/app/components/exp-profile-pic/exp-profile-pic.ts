import { Component, Input, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'exp-profile-pic',
  templateUrl: './exp-profile-pic.html',
  styleUrls: ['./exp-profile-pic.scss'],
})
export class ExpProfilePic {

	@Input() user: any = 0;

	ngOnInit(){
		let $ppc = $('.progress-pie-chart');
		let percent = parseInt($ppc.data('percent'));
		let deg = 360*percent/100;
		if (percent > 50) { $ppc.addClass('gt-50'); }
		$('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
	}
}
