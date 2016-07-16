import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {TestPage} from './pages/test/test';

import * as firebase from 'firebase';

@Component({
   template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any; 
  

  constructor( private platform:Platform ) {
   
     
     var FbConfig = {
      apiKey: "AIzaSyDpoX6zV0yLsgvhMon2GC3QoFO_cZyjzR8",
      authDomain: "gadash-nirim.firebaseapp.com",
      databaseURL: "https://gadash-nirim.firebaseio.com",
      storageBucket: "gadash-nirim.appspot.com",
    };

    firebase.initializeApp(FbConfig);
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // If there's a user take him to the home page.
        this.rootPage = HomePage;
      } else {
        // If there's no user logged in send him to the LoginPage
        this.rootPage = LoginPage;
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }
}

ionicBootstrap(MyApp)
