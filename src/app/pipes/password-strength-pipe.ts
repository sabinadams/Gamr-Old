import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'passwordStrength'})
export class PasswordStrengthPipe implements PipeTransform {

  criteria = { uppercase: 1, lowercase: 2, numerical: 4, special: 8 };

  transform(password: string, action: string): string {
  	// Variables
    let strength = !password ? 0 : password.length;
    const regex =  password.match(/([A-Z]+|[a-z]+|[0-9]+|[\!\@\#\$\%\^\&\*\(\)]+)/g) || [];
    let flags =  0;
    let multiplier = 1;

    for (let i = 0; i < regex.length; i++) {
      if (regex[i].match(/[A-Z]+/g)) { flags |= this.criteria.uppercase; }
      if (regex[i].match(/[a-z]+/g)) { flags |= this.criteria.lowercase; }
      if (regex[i].match(/[0-9]+/g)) { flags |= this.criteria.numerical; }
      if (regex[i].match(/[\!\@\#\$\%\^\&\*\(\)]+/g)) { flags |= this.criteria.special; }
      // Need better special char matching
    }

    if ((flags & 1 ) !== 0) { multiplier++; }
    if ((flags & 2 ) !== 0) { multiplier++; }
    if ((flags & 4 ) !== 0) { multiplier++; }
    if ((flags & 8 ) !== 0) { multiplier++; }

    strength *= multiplier;

    // Mess with the strength values to tweak how strong you want the user
    // to have it. Psychological validation and nothing else right here.
    if ( strength === 0 ) { return action === 'color' ? 'dimgray' : 'None'; }
    else if ( strength < 24 ) { return action === 'color' ? 'yellow' : 'Weak'; }
    else if ( strength < 36 ) { return action === 'color' ? 'yellowgreen' : 'Mild'; }
    else if ( strength < 48 ) { return action === 'color' ? 'green' : 'Mildly String'; }
    else { return action === 'color' ? 'lime' : 'Strong'; }

  }
}
