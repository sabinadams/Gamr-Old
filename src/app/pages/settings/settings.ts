import { Component } from '@angular/core';

@Component({
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})

export class SettingsPage {
  user= JSON.parse(localStorage.getItem("user"));
  editID= 0;
  
  updateOnEnter(id:string, e) {
    if(e.keyCode!= 13)
      return;
    
    this.editID= 0;
    this.update(id);
  }
  
  update(id:string) {
    console.log(this.user);
    switch(id)  {
      case "tag": {
        // TODO: update the user's tag here.
      }break;
      case "display-name":  {
        // TODO: update the user's display name here
      }break;
      case "first-name":  {
        // TODO: update the user's first name here
      }break;
      case "last-name": {
        // TODO: update the user's last name here
      }break;
      case "description": {
        // TODO: update the user's description here.
      }break;
    }
  }
}

