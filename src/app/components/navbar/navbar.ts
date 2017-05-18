import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { EventService } from '../../services/event-service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements OnInit{
  constructor( private _authService: AuthService, private _eventService: EventService, private _router: Router ){
    _eventService.unreadCount$.subscribe( count => {
      this.unread_count = count;
    });
  }
  unread_count: number;
  @Input() Authorized: any;
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

  homeClick(){
    if( this._router.url === '/home' ) {
       $('html, body').animate({scrollTop:0},'50');
       this._eventService.emitUnreadMerger('Merge Unread Timeline Posts');
    }
  }

  logout() {
    this._authService.logout();
  }
}
