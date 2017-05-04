//Will be pipe for password strength 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'passwordStrength'})
export class PasswordStrengthPipe implements PipeTransform {
  
  // Variables
  passwordStrInfo =  {
    textlen:  0,
    hasUppercase: false,
    hasLowercase: false,
    hasNumbers: false,
    hasSpecials: false
  }; 


  transform(password: string, action: string): string {
  	if(!password) return action == 'color' ? 'dimgray' : 'None';

  	// Variables
    let regex =  password.match(/([A-Z]+|[a-z]+|[0-9]+|[\!\@\#\$\%\^\&\*\(\)]+)/g);
    let flags =  0;
    let correctFlags= (
      1 | // Uppercase flag
      2 | // Lowercase flag
      4 | // Numerical flag
      8 // Special flag
    );
    
    for(var i= 0; i< regex.length; i++) {
      if(regex[i].match(/[A-Z]+/g))  flags|= 1;
      if(regex[i].match(/[a-z]+/g))  flags|= 2;
      if(regex[i].match(/[0-9]+/g))  flags|= 4;
      // Need better checking for the special characters
      if(regex[i].match(/[\!\@\#\$\%\^\&\*\(\)]+/g))  flags|= 8;
    }
    
    this.passwordStrInfo.textlen = password.length;
    this.passwordStrInfo.hasUppercase = ((flags&1)!= 0);
    this.passwordStrInfo.hasLowercase = ((flags&2)!= 0);
    this.passwordStrInfo.hasNumbers = ((flags&4)!= 0);
    this.passwordStrInfo.hasSpecials = ((flags&8)!= 0);

    let strength = this.passwordStrInfo.textlen;
    let multiplier = 1;
    
    if(this.passwordStrInfo.hasLowercase) multiplier++;
    if(this.passwordStrInfo.hasUppercase) multiplier++;
    if(this.passwordStrInfo.hasNumbers) multiplier++;
    if(this.passwordStrInfo.hasSpecials)  multiplier++;
    
    strength *= multiplier;
        
    // Mess with the strength values to tweak how strong you want the user
    // to have it. Psychological validation and nothing else right here.
    if( strength == 0 ) return action == 'color' ? 'dimgray' : 'None'
    else if( strength < 24 ) return action == 'color' ? 'yellow' : 'Weak'
    else if( strength < 36 ) return action == 'color' ? 'yellowgreen' : 'Mild'
    else if( strength < 48 ) return action == 'color' ? 'green' : 'Mildly String'
    else return action == 'color' ? 'lime' : 'Strong'
  }
}