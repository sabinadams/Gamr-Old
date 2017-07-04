import { Component } from '@angular/core';
import { AuthService } from './services/auth-service';
import { CheatCodesService } from './services/cheat-codes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private _authService: AuthService, private _cheatService: CheatCodesService ) {
    window.addEventListener('keydown', (args) => {
      _cheatService.appendKeyToCode(args);
    });
  }
  userCheck(){ return this._authService.isLoggedIn(); }

}
