import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

import 'rxjs';
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  
  items: Observable<any[]>;
  
  constructor(
    private navController: NavController,
    public af: AngularFire
    ) {
  
    //const obj = af.object('/name', {preserveSnapshot: true});
    this.items = af.database.list('/opartors');

    this.items.subscribe(x => console.log(x));
    
  }

  
  ngOnInit() {
    
  }
}
