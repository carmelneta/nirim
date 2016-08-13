import { Component } from '@angular/core';
import { Modal, NavController,ViewController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Observable'; 

import {UserData} from '../../providers/user-data/user-data';
import {Entery, Tracktor, Field} from '../../providers/user-data/models';
import {EntiresService} from '../../providers/services/entries.service';
@Component({
  templateUrl: 'build/pages/create-entry/create-entry.html',
  providers : [UserData, EntiresService]
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
    private userData: UserData,
    private entiresService: EntiresService
 ) { 
        
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

  save() {
    this.entiresService.create( new Entery(
      'inprogress',
      this.tracktorId,
      this.fieldId,
      this.hours
    ));     

    this.close();
  }

}
