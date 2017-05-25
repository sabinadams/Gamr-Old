import { Component } from '@angular/core';
@Component({
  selector: 'chatbar',
  templateUrl: './chatbar.html',
  styleUrls: ['./chatbar.scss'],
})
export class ChatbarComponent {

  toggleNav(){
  	if(document.getElementById("mySidenav").style.width == "224px"){
  		this.closeNav();
  	} else {
  		this.openNav();
  	}
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "224px";
    document.getElementById("toggler").style.marginRight = "224px";
    document.getElementById("wcontainer").style.right = "224px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("toggler").style.marginRight = "0";
    document.getElementById("wcontainer").style.right = "0";
  }

  public itemStringsLeft: any[] = [
    { id: 1, chat: 'test chat', name: 'Windstorm' },
    { id: 2, chat: 'test chat', name: 'Bombasto' },
    { id: 3, chat: 'test chat', name: 'Magneta' }
  ];
 
  public itemStringsRight: any[] = [
    { id: 4, chat: 'test chat', name: 'Tornado' },
    { id: 5, chat: 'test chat', name: 'Mr. O' },
    { id: 6, chat: 'test chat', name: 'Tomato' }
  ];
}
