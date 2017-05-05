//Will be pipe for password strength 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'inputValidation'})
export class InputValidationPipe implements PipeTransform {
	// Variables
	valid_color: string=	"lime";
	invalid_color: string=	"tomato";

  transform(input: string, action: string): string {
		switch(action)	{
			case "email":	return this.validateEmail(input);
			case "password": return this.validatePassword(input);
			case "confirm_password": return this.validateConfirmPassword(input);
			case "username": return this.validateUsername(input);
		}
		
		return ""; 
  }
	
	// Validates the email textbox
	validateEmail(input: string): string	{
		if(input=== "")
			return "";
		
		// Variables
		var	regex=	input.match(
			/[a-zA-Z0-9]+(\.?[a-zA-Z0-9]+)*\@[a-zA-Z0-9]+(\.?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,3}/g
		);
		
		return ((regex) ?
			this.valid_color :
			this.invalid_color
		);
	}
	
	// Validates the password textbox
	validatePassword(input: string): string	{
		if(input=== "")
			return "";
		
		// If I remember you correct Sabin, you said the minimum requirements are at least 3 characters
		// I am taking you on your word. -- Paul
		return ((input.length>= 3) ?
			this.valid_color :
			this.invalid_color
		);
	}
	
	// Validates the confirm password textbox
	validateConfirmPassword(input: string): string	{
		if(input=== "\n")
			return "";
		
		// Variables
		var	splits: string[]=	input.split('\n');
		
		return ((splits[0]=== splits[1]) ?
			this.valid_color :
			this.invalid_color
		);
	}
	
	// Validates the username textbox	
	validateUsername(input: string): string	{
		if(input=== "")
			return "";
		
		// Variables
		var	isValid=	true;
		
		// Do ninja db majick to figure out if the username is taken or not.
		
		return ((isValid) ?
			this.valid_color :
			this.invalid_color
		);
	}
}