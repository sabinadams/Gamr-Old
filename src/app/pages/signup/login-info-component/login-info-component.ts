import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'login-info',
  templateUrl: './login-info-component.html',
  styleUrls: ['./login-info-component.scss'],
})
export class LoginInfoComponent {

	@Output() formEmitter = new EventEmitter();

	constructor(private _authService: AuthService){}

	personal_info = {
		email: '',
		password: '',
		confirm_password: '',
		description: '',
		tag: '',
		first_name: '',
		last_name: '',
		display_name: ''
	}
	tagTaken = false;
	emailTaken = false;
	updateForm() {
		this.formEmitter.emit(this.personal_info);
	}

	checkTag() {
		if(this.personal_info.tag != ""){
			this._authService.checkTagAvailablity( this.personal_info.tag ).subscribe( res => {
				this.tagTaken = res.available ? false : true;
			});
		}
	}

	checkEmail() {
		if(this.personal_info.email != ""){
			this._authService.checkEmailAvailability( this.personal_info.email ).subscribe( res => {
				this.emailTaken = res.available ? false : true;
			});
		}
	}
}
