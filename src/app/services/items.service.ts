import { effect, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { Observable, tap } from 'rxjs';
import { MoveItemFilters } from '../models/item-filters.type';
import { MoveItem } from '../models/move-item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _items = signal<MoveItem[]>([]);

  public items = this._items.asReadonly();
  public filters = signal<MoveItemFilters>({} as MoveItemFilters);

  constructor(private db: Firestore) {
    this.getItems().subscribe();
    effect(() => {
      console.log('Items updated:', this._items());
    });
  }

  public getItems(): Observable<MoveItem[]> {
    const itemCollection = collection(this.db, 'items');

    return (
      collectionData(itemCollection, { idField: 'id' }) as Observable<
        MoveItem[]
      >
    ).pipe(tap((items) => this._items.set(items)));
  }

  public addItem(item: MoveItem): void {
    const itemCollection = collection(this.db, 'items');

    addDoc(itemCollection, item).then((docRef) => {
      console.log(docRef);
      this._items.update((items) => [...items, { ...item, id: docRef.id }]);
    });
  }

  public removeItem(item: MoveItem): void {
    const ref = doc(this.db, `items/${item.id}`);

    deleteDoc(ref).then(() => {
      this._items.update((items) => items.filter((cat) => cat.id !== item.id));
    });
  }
}
