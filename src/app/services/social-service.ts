import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient } from './http-interceptor-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SocialService {
  constructor( private _secureHttp: HttpClient, private _router: Router ) {}

  savePost( data ) {
    return this._secureHttp.post(`http://api.gamr.co/feed/save/`, {data: data}).map(( res: Response ) => {
      return res.json();
    });
  }

  likePost( ID ) {
    return this._secureHttp.post(`http://api.gamr.co/likepost/`, {postID: ID}).map(( res: Response ) => {
      return res.json();
    }).catch(( error: any ) => Observable.throw(error.json().error || 'Server error'));
  }

  deletePost( ID ) {
    return this._secureHttp.post(`http://api.gamr.co/feed/delete/`, {ID: ID}).map(( res: Response ) => {
      return res.json();
    }).catch(( error: any ) => Observable.throw(error.json().error || 'Server error'));
  }

  getFeed( timestamp, polling) {
    return this._secureHttp.get(`http://api.gamr.co/feed/${timestamp}/${polling}/`).map(res => {
      return res.json();
    });
  }
}
