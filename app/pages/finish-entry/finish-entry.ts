import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Entery} from '../../providers/user-data/models'; 
import {UserData} from '../../providers/user-data/user-data';

@Component({
  templateUrl: 'build/pages/finish-entry/finish-entry.html',
  providers : [UserData]
})
export class FinishEntryPage {

  entry: Entery; 

  constructor(
    private nav: NavController,
    private viewCtrl: ViewController,
    _navParams: NavParams,
    private userData: UserData
    ) { 
      this.entry = _navParams.data.entry;            
  }


  close() {
    this.viewCtrl.dismiss();
  }


  save(){
    this.userData.finishEntry(this.entry);
    this.close();
  }
}
