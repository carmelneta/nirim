import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {AppStore} from '../stores/appstore.model';
import {Entery} from '../user-data/models';

@Injectable()
export class EntiresService {
    
  entries: any;
  uId: string; 
  inProgressEntries: any;
  ref: any;

  constructor(
      private store: Store<AppStore>
  ) {
    this.uId = firebase.auth().currentUser.uid;

    //  Connect To STORE
    this.entries = store.select('entries');

    //  Regiter Databeas
    this.ref = firebase.database().ref('operators/' + this.uId + '/entries');

    this.inProgressEntries = this.ref
      .orderByChild('status')
      .equalTo('inprogress')
      .limitToLast(100);
       
}

  listen() {
        
    const buildEntry = function(snapshot) {
      let vals = snapshot.val();

      return new Entery(
        vals.status, 
        vals.tracktor,
        vals.field,
        vals.startHours,
        snapshot.key
      );
    };

    this.inProgressEntries.on('child_added', snapshot => { 
        
        this.store.dispatch({
            type: 'CREATE_ITEM',
            payload: buildEntry(snapshot) 
        });
    });

    this.inProgressEntries.on('child_removed', snapshot =>        
        this.store.dispatch({
            type: 'DELETE_ITEM',
            payload: buildEntry(snapshot) 
        })       
    );
  }
 
  create(entry: Entery):void { 

    //  Get Key for new entry
    var newEntryKey = this.ref.push().key;
        
    delete entry.id;
    delete entry.endHours;

    // Write the new 
    var updates = {};
    updates[newEntryKey] = entry;
    
    this.ref.update(updates);
          
  }


  finish(entry: Entery): void{ 
    // console.log(entry);
    
    entry.status = 'done';
    var updates = {};
    updates[entry.id] = entry; 
    this.ref.update(updates);
    
  }
}