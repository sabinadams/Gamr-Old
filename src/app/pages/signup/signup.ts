import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {

  constructor( private _authService: AuthService, private _router: Router ){}

   view = 'login-info';

   form = {
   	email: '',
   	password: '',
   	confirm_password: '',
   	description: '',
   	tag: '',
   	profile_picture: '',
   	banner_picture: '',
   	token: this._authService._generateToken()
   	//Connected Account Stuffs
   }

   ngOnInit(){}

   handleData($event){
   	this.form = Object.assign( {}, this.form, $event);
   }

   createAccount(){
   	this._authService.register( this.form ).subscribe( res => {
   		if(res.STATUS == 200) {
   			localStorage.setItem( 'user', JSON.stringify( res.USER ) );
   			localStorage.setItem( 'token', res.USER.token ); 
   			this._router.navigate(['home']);
   		} else {
   			console.log(res);
   			alert(`Temporary Error Message: ${res.MESSAGE}`);
   		}
   	});
   }
}
