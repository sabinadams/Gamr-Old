import { Component,  Input } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { EventService } from '../../services/event-service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})

export class NavbarComponent {
  constructor( private _authService: AuthService, private _eventService: EventService, private _router: Router ){
    _eventService.unreadCount$.subscribe( count => {
      this.unread_count = count;
    });
  }
  unread_count: number;
  @Input() Authorized: any;

  homeClick(){
    if( this._router.url === '/home' ) {
      //Smoothe scroll to top
      window.scrollTo(0, 0);
      this._eventService.emitUnreadMerger('Merge Unread Timeline Posts');
    }
  }

  logout() {
    this._authService.logout();
  }
}
