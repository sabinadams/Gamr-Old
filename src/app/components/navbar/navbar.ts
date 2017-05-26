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
  @Input() Authorized: any;
  user = JSON.parse(localStorage.getItem('user'));
  unread_count: number;
  isCollapsed = true;
  constructor( private _authService: AuthService, private _eventService: EventService, private _router: Router ){
    _eventService.unreadCount$.subscribe( count => {
      this.unread_count = count;
    });
  }

  emitMerger() { this._eventService.emitUnreadMerger('Merge Unread Timeline Posts'); }

  logout() { this._authService.logout(); }

  toggleCollapse(): void { this.isCollapsed = !this.isCollapsed; }
}
