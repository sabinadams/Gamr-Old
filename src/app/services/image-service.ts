import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {
  constructor( private _http: Http, private _router: Router ) {}

	uploadImage(image){
		let headers = new Headers({ 'Authorization': `Client-ID 6108a749981cd34` });
		let options = new RequestOptions({ headers: headers });
		return this._http.post('https://api.imgur.com/3/upload', {image: image.split(',')[1]}, options).map(res => {
			return res.json();
		});
	}


}