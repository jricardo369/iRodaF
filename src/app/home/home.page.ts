import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage: Storage) { }

 
  ngOnInit() {

    // this.storage.set('bdiroda', 'Ms. Rayita & Mr. Trompas');

    // this.storage.get('bdiroda');  
     
  }
  
}
