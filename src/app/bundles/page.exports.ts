//Page Imports
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

export class Pages {
	constructor(){}
	

	getPages(){
		return [
			LoginPage,
			HomePage,
			ProfilePage
		];	
	}
}