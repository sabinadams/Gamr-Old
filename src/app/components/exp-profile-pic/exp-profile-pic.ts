import { Component, Input, OnInit } from '@angular/core';
import { ExpCalcPipe } from '../../pipes/exp-calc-pipe';

@Component({
  selector: 'exp-profile-pic',
  templateUrl: './exp-profile-pic.html',
  styleUrls: ['./exp-profile-pic.scss'],
})
export class ExpProfilePic implements OnInit{

	@Input() user: any = 0;
	constructor(){
	}

	ngOnInit(){
		let expCalcPipe = new ExpCalcPipe();
		this.user.next_level_xp = expCalcPipe.transform(this.user.exp_count, 'next');
	}
}
