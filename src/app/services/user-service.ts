import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient } from './http-interceptor-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor( private _secureHttp: HttpClient, private _router: Router ) {}

  getUserDetails( tag ) {
    return this._secureHttp.get(`http://api.gamr.co/user/${tag}/`).map((res:Response) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
}