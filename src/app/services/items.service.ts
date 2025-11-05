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
import { combineLatest, map, Observable, tap } from 'rxjs';
import { MoveItemFilters } from '../models/item-filters.type';
import { MoveItem } from '../models/move-item.model';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _items = signal<MoveItem[]>([]);

  public items = this._items.asReadonly();
  public filters = signal<MoveItemFilters>({} as MoveItemFilters);

  constructor(private db: Firestore, private categoryService: CategoryService) {
    this.getItems().subscribe();
  }

  public getItems(): Observable<MoveItem[]> {
    const itemCollection = collection(this.db, 'items');
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
            category: categories.find((c) => c.id === item.categoryId),
          };
        });
      }),
      tap((items) => this._items.set(items))
    );
  }

  public addItem(item: MoveItem): void {
    const itemCollection = collection(this.db, 'items');

    addDoc(itemCollection, { ...item, createdAt: serverTimestamp() });
  }

  public removeItem(item: MoveItem): void {
    const ref = doc(this.db, `items/${item.id}`);

    deleteDoc(ref);
  }
}
