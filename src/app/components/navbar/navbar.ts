import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements OnInit{
  constructor( private _authService: AuthService ){}
  
  user: Object;
  @Input() Authorized: any;

  ngOnInit() {
    this.user = localStorage.getItem('user') || [];
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

  logout() {
    this._authService.logout();
  }
}
