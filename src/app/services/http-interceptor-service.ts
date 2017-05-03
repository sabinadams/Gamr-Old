//My modified version of the Http service

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpClient {
  http:any;
  constructor(http: Http, private _router: Router) {
    this.http = http;
  }

  //Used to append the Device token bearer and Authorization headers to all requests
  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  //We don't necessarily want to log a user out and send them to login screen if something doesn't load correctly. 
  killSession(){
    //Send you home
    console.log("Session killed");
  }

  //Changes GET requests to always require the device token and Authorization headers
  get(url) {
    let headers = new Headers({ 'Accept': 'application/json' });
    this.createAuthorizationHeader(headers);
    return this.http.get(url, { headers: headers }).catch((error:any) => {
        this.killSession();
    });
  }

  //Changes POST requests to always require the device token and Authorization headers
  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, { headers: headers }).catch((error:any) => {
        this.killSession();
    });
  }

}