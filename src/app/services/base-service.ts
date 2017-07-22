import { Injectable, isDevMode } from '@angular/core';
@Injectable()
export class BaseService {
    // Replace this with a local instance of the server
    public baseURL = isDevMode() ? 'http://api.gamr.co' : 'http://api.gamr.co';

    constructor(){}

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}
