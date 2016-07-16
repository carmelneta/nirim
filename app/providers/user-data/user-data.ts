import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {Entery, Tracktor, Field} from './models';

@Injectable()
export class UserData {
  uId: string; 
  inProgressEntries: any;
  tracktorsQuery: any;
  fieldsQuery: any;
  
  constructor() {
    this.uId = firebase.auth().currentUser.uid;

    this.inProgressEntries = firebase.database().ref('opartors/' + this.uId + '/entries')
      .orderByChild('status')
      .equalTo('inprogress')
      .limitToLast(100);


    this.tracktorsQuery = firebase.database().ref('tracktors/')
      .limitToLast(100);


    this.fieldsQuery = firebase.database().ref('fields/')
      .limitToLast(100);

      
    
  }
  
  getAllEntries(): Observable<Entery> {
    return Observable.create(observer => {
      let listener = this.inProgressEntries.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Entery(          
          data.status, 
          data.tracktor,
          data.field,
          snapshot.key,
          data.startHours
        ));
      }, observer.error);

      this.inProgressEntries.on('value', snapshot => {
        let data = snapshot.val();
        console.log(data);
         
      }, observer.error);

      return () => {
        this.inProgressEntries.off('child_added', listener);
      };
    });
  }

  getAllTracktors(): Observable<Tracktor> {
    return Observable.create(observer => {
      let listener = this.tracktorsQuery.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Tracktor(
          snapshot.key,
          data.hours, 
          data.name
        ));
      }, observer.error);

      return () => {
        this.tracktorsQuery.off('child_added', listener);
      };
    });
  }

  getAllFields(): Observable<Field> {
    return Observable.create(observer => {
      let listener = this.fieldsQuery.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Field(
          snapshot.key,
          data.name,
          data.prop,
          data.color
        ));
      }, observer.error);

      return () => {
        this.fieldsQuery.off('child_added', listener);
      };
    });
  }

  getTracktorById(tackId: string):Observable<Tracktor> {
       

    return Observable.create(observer => {
      let listener = firebase.database().ref(`tracktors/${tackId}`)
        .on('value', snapshot => {
          let data = snapshot.val();
          observer.next(new Tracktor(
             snapshot.key,
            data.hours, 
            data.name
          ));
        }, observer.error);

        return () => {
          this.fieldsQuery.off('value', listener);
        };
    });

  }

  createEntry(tarcktor: any): void {
    
    //  Get Key for new entry
    var newTracktorKey = firebase.database().ref().child(`opartors/${this.uId}/entries`).push().key;
 
    // Write the new 
    var updates = {};
    updates[`opartors/${this.uId}/entries/` + newTracktorKey] = tarcktor;
    
    //  Note: can be used like this to create multi insertes:
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    firebase.database().ref().update(updates); 
    
    return;
  }

  finishEntry(entry: Entery): void{ 

    entry.status = 'done';
    var updates = {};
    updates[`opartors/${this.uId}/entries/${entry.id}`] = entry; 
    firebase.database().ref().update(updates);
     
    
    return;
  }
}



