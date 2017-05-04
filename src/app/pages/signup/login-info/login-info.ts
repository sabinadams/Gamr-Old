import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'login-info',
  templateUrl: './login-info.html',
  styleUrls: ['./login-info.scss'],
})
export class LoginInfoComponent implements OnInit{

  constructor(){}

  email: string = "";
  password: string = "";
  confirm_password: string = "";

  ngOnInit() {}
  
}
