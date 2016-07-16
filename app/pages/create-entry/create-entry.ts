import { Component } from '@angular/core';
import { Modal, NavController,ViewController, NavParams } from 'ionic-angular';

// import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import {Observable} from 'rxjs/Observable'; 

import {UserData} from '../../providers/user-data/user-data';
import {Entery, Tracktor, Field} from '../../providers/user-data/models';

@Component({
  templateUrl: 'build/pages/create-entry/create-entry.html',
  providers : [UserData]
})
export class CreateEntryPage {

  public tracktors: Tracktor[] = [];
  public fields: Field[] = [];


  tracktorId: string;  
  fieldId: string;
  hours: number;

 constructor(
    // public af: AngularFire,
    _navParams: NavParams,
    private viewCtrl: ViewController,
    private userData: UserData) { 
        
        userData.getAllTracktors().subscribe(tracktor => {
          this.tracktors.push(tracktor);          
        });


        userData.getAllFields().subscribe(field => {
          this.fields.push(field);          
        });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  tracktorChanged(trackId: string) {
     
      this.userData.getTracktorById(trackId).subscribe(tracktor => { 
        this.hours = tracktor.hours
      });
      
  }

  save(){

    this.userData.createEntry({
      'field': this.fieldId,
      'tracktor': this.tracktorId,
      'status': 'inprogress',
      'startHours': this.hours,
      'endHours' : null
    }); 
    this.close();
  }

}
