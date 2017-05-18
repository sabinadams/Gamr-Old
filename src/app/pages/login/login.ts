import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit {
	constructor( private _authService: AuthService, private _router: Router ){}

	login_form = { email: '', password: '' };

	ngOnInit() {
		if(localStorage.getItem('user') && localStorage.getItem('token')) 
			this._router.navigate(['home']);
	}

	login(){
		if(this.login_form.email.trim() != '' && this.login_form.password.trim() != ''){
			this._authService.login( this.login_form ).subscribe( res => {
				if( res.logged_in ) this._router.navigate(['home']);
			});
		} else {
			this.login_form = { email: '', password: '' }; //Should also signify the failure
		}
	}
}
