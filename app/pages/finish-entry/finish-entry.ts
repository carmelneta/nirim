import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Entery} from '../../providers/user-data/models'; 
// import {UserData} from '../../providers/user-data/user-data';
import {EntiresService} from '../../providers/services/entries.service';
@Component({
  templateUrl: 'build/pages/finish-entry/finish-entry.html',
  providers : [EntiresService]
})
export class FinishEntryPage {

  entry: Entery; 

  constructor(
    private nav: NavController,
    private viewCtrl: ViewController,
    _navParams: NavParams,
    private entiresService: EntiresService
    ) { 
      this.entry = _navParams.data.entry;            
  }


  close() {
    this.viewCtrl.dismiss();
  }


  save(){
    this.entiresService.finish(this.entry);
    this.close();
  }
}
