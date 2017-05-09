import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { InputValidationPipe } from "../../pipes/input-validation-pipe";

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
   
   checkIfAvailable(): boolean	{
		// Variables
		var ivp:InputValidationPipe=	new InputValidationPipe();
		
		if(ivp.validateEmail(this.form.email)!= ivp.valid_color)
			return true;
		if(ivp.validateConfirmPassword(this.form.password+"\n"+this.form.confirm_password)!= ivp.valid_color)
			return true;
		if(ivp.validateUsername(this.form.tag)!= ivp.valid_color)
			return true;
		
	   	return false;
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
