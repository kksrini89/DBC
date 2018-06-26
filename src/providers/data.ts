import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataProvider {
  customersCollectionRef: AngularFirestoreCollection<User>;
  customersObservable: Observable<User[]>;

  constructor(public afStore: AngularFirestore) {
    console.log('Hello DataProvider Provider');
    this.customersCollectionRef = this.afStore.collection<User>('customers');
    this.customersObservable = this.customersCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as User;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  async addToDatabase(value: User) {
    let id = this.afStore.createId();
    value.id = id;
    await this.customersCollectionRef.doc(id).set(value);
    return value;
  }

  async updateCustomer(value: User) {
    let doc = this.customersCollectionRef
      .doc(value.id);
      doc.update({ isMixyChecked: value.isMixyChecked, isWellChecked: value.isWellChecked });
  }
}

export interface User {
  id?: string;
  name: string;
  location: string;
  isMixyChecked: Boolean;
  isWellChecked: Boolean;
}
