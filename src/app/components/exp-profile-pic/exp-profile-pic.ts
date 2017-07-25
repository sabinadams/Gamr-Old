import { Component, Input } from '@angular/core';

@Component({
  selector: 'exp-profile-pic',
  styles: [`
  	.round-progress {
  	    background-size: cover !important;
		border-radius:50% !important;
		margin:auto auto 10px auto;
  	 }
  `],
  template: `
	<round-progress 
		class="round-progress"
	    [ngStyle]="{background: 'url(' + user.profile_pic + ') center center no-repeat'}"
	    [current]="user.exp_count" 
	    [max]="user.exp_count | calcExp: 'next' "
	    [color]="'#956bb9'" 
	    [background]="'rgba(0,0,0,0.5)'"
	    [radius]="65" 
	    [stroke]="5"
	    [semicircle]="false" 
	    [rounded]="false" 
	    [clockwise]="true"
	    [duration]="800" 
	    [animation]="'easeInOutQuart'" 
	    [animationDelay]="2">
	</round-progress>
	<p 
	    counto 
	    [step]="30" 
	    [duration]="1" 
	    [countTo]="user.exp_count" 
	    [countFrom]="0" 
	    (countoChange)="counto = $event"
	>
		{{ counto | calcExp: "curr" }} / {{ user.exp_count | calcExp: "next" }} exp
	</p>
	<h4> @{{user.tag}} <small>Lvl. {{ user.exp_count | calcExp: "getLevel" }}</small> </h4>
  `
})
export class ExpProfilePic {
 @Input() user: any;
}
