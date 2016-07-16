import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {MenuController, ionicBootstrap, NavController, Modal, Popover} from 'ionic-angular';
import * as firebase from 'firebase';
import {LoginPage} from '../login/login';
import {FinishEntryPage} from '../finish-entry/finish-entry'; 
import {CreateEntryPage} from '../create-entry/create-entry';
import {AuthData} from '../../providers/auth-data/auth-data';
import {UserData} from '../../providers/user-data/user-data';


import {Entery} from '../../providers/user-data/models'; 


import 'rxjs';
import {Subscription} from 'rxjs/Subscription';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers : [UserData]
})
export class HomePage {
  
  public enteries: Entery[] = [];
 
  constructor( 
    private nav: NavController,
    private userData : UserData
    ) { 

      this.userData.getAllEntries()
      .subscribe(post => { this.enteries.push(post); });
      // .flatMap()
      // .subscribe()
      ;

      console.log(this.enteries);
      
  } 


  ngOnInit() { }
  
  createEntry() {
    let modal = Modal.create(CreateEntryPage);
    this.nav.present(modal);
  }

  
  finishEntry(entry) {
 
    let modal = Modal.create(FinishEntryPage, { 
      entry
    });
    this.nav.present(modal);
  }


  showPopover(){
    let popover = Popover.create(MyPopover);
    this.nav.present(popover);
  }

}



@Component({
  template: `
    
    <ion-list class="popover-page">

    <ion-item>
      {{ (user | async)?.name }}
    </ion-item>
      <ion-item (click)="logout()">
          יציאה
          <ion-icon name="log-in" end item-right></ion-icon>
      </ion-item>
    </ion-list>
  `,
  providers: [AuthData]
})

export class MyPopover{
  
  logedIn: boolean = false;
  user: Observable<any>;
  constructor( 
    public authData: AuthData, 
    private nav: NavController
    ) {
       
      
  }

  logout(){ 
    this.authData.logoutUser();
  } 

}
 
