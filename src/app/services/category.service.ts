import { computed, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { Observable, of, tap } from 'rxjs';
import { Category } from '../models/category.interface';
import { AuthenticationService } from './authentication.service';

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

  constructor(private db: Firestore, private auth: AuthenticationService) {}

  public getCategories(): Observable<Category[]> {
    const user = this.auth.currentUser();

    if (!user) return of([]);

    const categoryCollection = collection(
      this.db,
      `users/${user.uid}/categories`
    );

    return (
      collectionData(categoryCollection, {
        idField: 'id',
      }) as Observable<Category[]>
    ).pipe(tap((categories) => this._categories.set(categories)));
  }

  public addCategory(category: Category): void {
    const user = this.auth.currentUser();

    if (!user) return;

    const categoryCollection = collection(
      this.db,
      `users/${user.uid}/categories`
    );

    addDoc(categoryCollection, category);
  }

  public removeCategory(category: Category): void {
    const user = this.auth.currentUser();

    if (!user) return;

    const ref = doc(this.db, `users/${user.uid}/categories/${category.id}`);

    deleteDoc(ref);
  }
}
