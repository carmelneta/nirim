import { Component } from '@angular/core';
import { NavController, ViewController, Loading} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/common';
import {AuthData} from '../../providers/auth-data/auth-data';
import {Observable} from 'rxjs/Observable';

import {HomePage} from '../home/home'; 

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})
export class LoginPage {
  public loginForm: any;


  constructor(
    public nav: NavController, 
    public authData: AuthData, 
    public formBuilder: FormBuilder
  ) {
    this.nav = nav;
    this.authData = authData;

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser(event){
    event.preventDefault();
    this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password);
   
  }

}
