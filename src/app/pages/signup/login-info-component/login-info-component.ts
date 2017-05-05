import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'login-info',
  templateUrl: './login-info-component.html',
  styleUrls: ['./login-info-component.scss'],
})
export class LoginInfoComponent {

	@Output() formEmitter = new EventEmitter();

	constructor(){}

	personal_info = {
		email: '',
		password: '',
		confirm_password: '',
		description: '',
		tag: '',
		first_name: '',
		last_name: ''
	}

	updateForm() {
		this.formEmitter.emit(this.personal_info);
	}

}
