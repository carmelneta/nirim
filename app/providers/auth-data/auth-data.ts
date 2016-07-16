import {Injectable} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
  
import {HomePage} from '../../pages/home/home';
import {LoginPage} from '../../pages/login/login';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {
  
  public fireAuth: any;
  public userProfile: any;
  local: Storage;

  constructor(public nav: NavController) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');


    console.log(this.userProfile);
    
    
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((authData) => {
      this.nav.setRoot(HomePage);
    }, (error) => {
        let prompt = Alert.create({
          message: error.message,
          buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);
    });
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }

}