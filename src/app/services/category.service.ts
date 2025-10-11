import { computed, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { Observable, tap } from 'rxjs';
import { Category } from '../models/category.interface';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private _categories = signal<Category[]>([]);

  /** All categories */
  public readonly categories = this._categories.asReadonly();

  public categoryFilters = signal<string[]>([]);

  /** Computed categories to map the ide with the name, for quick access */
  public readonly categoryMap = computed<Record<string, string>>(() =>
    this._categories().reduce((map, cat) => {
      map[cat.id!] = cat.name;
      return map;
    }, {} as Record<string, string>)
  );

  constructor(private db: Firestore) {}

  public getCategories(): Observable<Category[]> {
    const categoryCollection = collection(this.db, 'categories');

    return (
      collectionData(categoryCollection, {
        idField: 'id',
      }) as Observable<Category[]>
    ).pipe(tap((categories) => this._categories.set(categories)));
  }

  public addCategory(category: Category): void {
    addDoc(collection(this.db, 'categories'), category).then((docRef) => {
      this._categories.update((cats) => [
        ...cats,
        { ...category, id: docRef.id },
      ]);
    });
  }

  public removeCategory(category: Category): void {
    const ref = doc(this.db, `categories/${category.id}`);

    deleteDoc(ref).then(() => {
      this._categories.update((cats) =>
        cats.filter((cat) => cat.id !== category.id)
      );
    });
  }
}
