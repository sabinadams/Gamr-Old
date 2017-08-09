import { Injectable, isDevMode } from '@angular/core';
import { environment } from '../../environments/environment';
import * as models from '../models/index';

@Injectable()
export class BaseService {
    
    public env: models.IEnv = environment;

    constructor(){}

    public getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}
