import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit{

  constructor(){}

  ngOnInit() {
    
    /*
    // This is to change the icon into other colors
    // Variables
    var brand=  document.getElementById("brandman");
    var deg=  Number(brand.style.filter.match(/[0-9]+/)[0]);
    
    setInterval(function() {
      deg+= 1;
      deg%= 360;
      brand.style.filter= "hue-rotate("+deg+"deg)";
      var seq= deg/360;
    }, 25);
    */
  }

}
