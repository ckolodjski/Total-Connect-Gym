import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  fireDatabaseProvidor: AngularFirestore;

  //https://firebase.google.com/docs/firestore/quickstart?authuser=1#web-v8_1
  constructor(fireDBModule: AngularFirestore) {
    this.fireDatabaseProvidor = fireDBModule;
    //this.fireDatabaseProvidor.firestore
   }
}
