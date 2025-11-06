import { Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  serverTimestamp,
} from '@angular/fire/firestore';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { MoveItem } from '../models/move-item.model';
import { AuthenticationService } from './authentication.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _items = signal<MoveItem[]>([]);

  public items = this._items.asReadonly();

  constructor(
    private db: Firestore,
    private categoryService: CategoryService,
    private auth: AuthenticationService
  ) {
    this.getItems().subscribe();
  }

  public getItems(): Observable<MoveItem[]> {
    const user = this.auth.currentUser();

    if (!user) {
      console.warn('No user found to fetch data');
      return of([]);
    }

    const itemCollection = collection(this.db, `users/${user.uid}/move-items`);
    const itemQuery = query(itemCollection, orderBy('createdAt', 'desc'));

    const items$ = collectionData(itemQuery, {
      idField: 'id',
    }) as Observable<MoveItem[]>;
    const categories$ = this.categoryService.getCategories();

    return combineLatest([items$, categories$]).pipe(
      map(([items, categories]) => {
        return items.map((item) => {
          return {
            ...item,
            category: categories.find((c) => c.id === item.categoryId)!,
          };
        });
      }),
      tap((items) => this._items.set(items))
    );
  }

  public addItem(item: MoveItem): void {
    const user = this.auth.currentUser();

    if (!user) {
      return;
    }

    const itemCollection = collection(this.db, `users/${user.uid}/move-items`);

    addDoc(itemCollection, { ...item, createdAt: serverTimestamp() });
  }

  public removeItem(item: MoveItem): void {
    const user = this.auth.currentUser();

    if (!user) {
      return;
    }

    const ref = doc(this.db, `users/${user.uid}/move-items/${item.id}`);

    deleteDoc(ref);
  }
}
