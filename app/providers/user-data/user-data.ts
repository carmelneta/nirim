import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {Entery, Tracktor, Field} from './models';

@Injectable()
export class UserData {
  uId: string; 
  // inProgressEntries: any;
  tracktorsQuery: any;
  fieldsQuery: any;
  
  constructor() {
    this.uId = firebase.auth().currentUser.uid;
 
    this.tracktorsQuery = firebase.database().ref('tracktors/')
      .limitToLast(100);


    this.fieldsQuery = firebase.database().ref('fields/')
      .limitToLast(100);

      
    
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
 
}



