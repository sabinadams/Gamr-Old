import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'inputValidation'})
export class InputValidationPipe implements PipeTransform {
 // Variables
 valid_color = 'lime';
 invalid_color = 'tomato';

 transform(input: string, action: string): string {
  switch (action)	{
   case 'email': return this.validateEmail(input);
   case 'password': return this.validatePassword(input);
   case 'confirm_password': return this.validateConfirmPassword(input);
   case 'username': return this.validateUsername(input);
  }
  return '';
 }

 // Validates the email textbox
 validateEmail(input: string): string {

  if ( input === '' ) { return ''; }

   const regex = input.match(/[a-zA-Z0-9]+(\.?[a-zA-Z0-9]+)*\@[a-zA-Z0-9]+(\.?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,3}/);

   return ( (regex && regex[0] === regex.input) ? this.valid_color : this.invalid_color);

  }

 // Validates the password textbox
 validatePassword(input: string): string	{
  if (input === '') { return ''; }
  return ( ( input.length >= 3 ) ? this.valid_color : this.invalid_color );
 }

 // Validates the confirm password textbox
 validateConfirmPassword(input: string): string	{
  if (input === '\n') { return ''; }
  const	splits: string[] = input.split('\n');
  return ( ( splits[0] === splits[1] ) ? this.valid_color : this.invalid_color );
 }

 // Validates the username textbox
 validateUsername(input: string): string	{
  if (input === '') { return ''; }
  const	isInvalid =	input.match(/[^a-zA-Z0-9\_]/);
  return ( ( !isInvalid ) ? this.valid_color : this.invalid_color );
 }

}
