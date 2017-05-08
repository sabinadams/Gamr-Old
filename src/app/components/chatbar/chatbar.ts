import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'chatbar',
  templateUrl: './chatbar.html',
  styleUrls: ['./chatbar.scss'],
})
export class ChatbarComponent implements OnInit{

  constructor(){}

  ngOnInit() {}

  toggleNav(){
  	if(document.getElementById("mySidenav").style.width == "250px"){
  		this.closeNav();
  	} else {
  		this.openNav();
  	}
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("toggler").style.marginRight = "250px";
    document.getElementById("wcontainer").style.right = "225px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
    document.getElementById("toggler").style.marginRight = "0";
    document.getElementById("wcontainer").style.right = "0";
  }
}
