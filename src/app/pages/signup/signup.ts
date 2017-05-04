import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage implements OnInit{

  constructor(){}
  
  // Variables
  passwordStrInfo=  {
    textlen:  0,
    hasUppercase: false,
    hasLowercase: false,
    hasNumbers: false,
    hasSpecials: false
  };

  ngOnInit() {}
  
  // TODO: Need to do an email validation or something.
  
  // Validates the password. args: Event
  validatePassword(args)  {
    // Variables
    var regex;
    var text= args.target.value;
    var flags=  0;
    var correctFlags= (
      1 | // Uppercase flag
      2 | // Lowercase flag
      4 | // Numerical flag
      8 // Special flag
    );
    
    // Do this just in case the user is backspacing and there is nothing in the value anymore
    this.passwordStrInfo.textlen= 0;
    this.passwordStrInfo.hasUppercase=  false;
    this.passwordStrInfo.hasLowercase=  false;
    this.passwordStrInfo.hasNumbers=  false;
    this.passwordStrInfo.hasSpecials=  false;
    this.displayStrength();
    
    if(!text)
      return;
    
    // Need better checking for the special characters
    regex=  text.match(/([A-Z]+|[a-z]+|[0-9]+|[\!\@\#\$\%\^\&\*\(\)]+)/g);
    
    if(!regex)  {
      console.log("DO ERROR HERE");
    }
    
    for(var i= 0; i< regex.length; i++) {
      if(regex[i].match(/[A-Z]+/g))  flags|= 1;
      if(regex[i].match(/[a-z]+/g))  flags|= 2;
      if(regex[i].match(/[0-9]+/g))  flags|= 4;
      // Need better checking for the special characters
      if(regex[i].match(/[\!\@\#\$\%\^\&\*\(\)]+/g))  flags|= 8;
    }
    
    this.passwordStrInfo.textlen= text.length;
    this.passwordStrInfo.hasUppercase=  ((flags&1)!= 0);
    this.passwordStrInfo.hasLowercase=  ((flags&2)!= 0);
    this.passwordStrInfo.hasNumbers=  ((flags&4)!= 0);
    this.passwordStrInfo.hasSpecials=  ((flags&8)!= 0);
    this.displayStrength();
    
    // Don't know what to do here just yet.
    // Has the ability to know what kind of characters it's been using.
    // Don't know what space is considered under.
    // Signed, Paul
    if(flags=== correctFlags) {
      console.log("Do Logic JHERE!");
    }
    else  {
      if((flags&1)== 0) {
        console.log("DO ERROR FOR UPPERCASE HERE");
      }
      if((flags&2)== 0) {
        console.log("DO ERROR FOR LOWERCASE HERE");
      }
      if((flags&4)== 0) {
        console.log("DO ERROR FOR NUMERICAL HERE");
      }
      if((flags&8)== 0) {
        console.log("DO ERROR FOR SPECIAL HERE");
      }
    }
    
  }
  
  // Displays the strength of the password
  displayStrength() {
    // Variables
    var strdisplay= document.getElementById("password-strength");
    var strength= this.passwordStrInfo.textlen;
    var multiplier= 1;
    
    if(this.passwordStrInfo.hasLowercase) multiplier++;
    if(this.passwordStrInfo.hasUppercase) multiplier++;
    if(this.passwordStrInfo.hasNumbers) multiplier++;
    if(this.passwordStrInfo.hasSpecials)  multiplier++;
    
    strength*=  multiplier;
    
    if(strength> 0) console.log(strength);
    
    // Mess with the strength values to tweak how strong you want the user
    // to have it. Psychological validation and nothing else right here.
    
    if(strength== 0)  {
      strdisplay.innerHTML= "None";
      strdisplay.style.color= "dimgray";
    }
    else if(strength< 24) {
      strdisplay.innerHTML= "Weak";
      strdisplay.style.color= "yellow";
    }
    else if(strength< 36) {
      strdisplay.innerHTML= "Mild";
      strdisplay.style.color= "yellowgreen";
    }
    else if(strength< 48) {
      strdisplay.innerHTML= "Mildly Strong";
      strdisplay.style.color= "green";
    }
    else  {
      strdisplay.innerHTML= "Strong";
      strdisplay.style.color= "lime";
    }
  }
  
  // Confirms the passsword. args: Event. otherControl: string
  confirmPassword(args, otherControl) {
    // Variables
    var elem: any= document.getElementById(otherControl);
    
    // Don't know what to do here yet. Basically have the textboxes have a red border
    // or a notification of errors or something. And when it has something correct
    // congradulate the user by a green border or notification or something.
    if(args.target.value== elem.value && elem.value!= "") {
      console.log("Do Logic Here");
    }
    else if(elem.value!= "")  {
      console.log("Do non-Logic Here");
    }
  }
}
