import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient } from './http-interceptor-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor( private _http: Http, private _secureHttp: HttpClient, private _router: Router ) {}

  // Creates randomized UUID Token for authentication
  _generateToken() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, c => {
      const r = ( d + Math.random() * 16 ) % 16 | 0;
      d = Math.floor( d / 16 );
      return( c === 'x' ? r : ( r & 0x7 | 0x8 ) ).toString( 16 );
    });
  }

  checkTagAvailablity(tag){
    return this._http.post(`http://api.gamr.co/tagcheck/`, { tag: tag }).map(( res: Response ) => {
      return res.json();
    });
  }

  checkEmailAvailability(email){
    return this._http.post(`http://api.gamr.co/emailcheck/`, { email: email }).map(( res: Response ) => {
      return res.json();
    });
  }

  isLoggedIn(){
    return localStorage.getItem( 'user' ) && localStorage.getItem( 'token' ) ? true : false;
  }

  login( data ) {
    data['token'] = localStorage.getItem('token') || this._generateToken();
    return this._http.post('http://api.gamr.co/login/', data).map(( res: Response ) => {
       const res_data = res.json();
       if( res_data.logged_in ) {
         localStorage.setItem( 'user', JSON.stringify( res_data ) );
         localStorage.setItem( 'token', res_data.token );
       }
       return res_data;
     }).catch(( error: any ) => Observable.throw(error.json().error || 'Server error'));
  }

  logout() {
    localStorage.removeItem( 'user' );
    localStorage.removeItem( 'token' );
    this._router.navigate( [''] );
  }

  register( data ) {
    return this._http.post('http://api.gamr.co/register/', {user: data}).map(( res: Response ) => {
       return res.json();
     }).catch(( error: any ) => Observable.throw(error.json().error || 'Server error'));
  }
}