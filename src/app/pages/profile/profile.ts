import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfilePage implements OnInit{


  constructor(private _userService: UserService, public _route: ActivatedRoute){}
  user: any;
  ngOnInit() {
  	this._route.params.subscribe(params => {
        this._userService.getUserDetails( params['tag'] || JSON.parse(localStorage.getItem('user')).tag ).subscribe( res => {
      		this.user = res;
      	});
    });
  }

}
