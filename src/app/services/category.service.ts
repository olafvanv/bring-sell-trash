import { computed, Injectable, signal } from '@angular/core';
import { Category } from '../models/category.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private _categories = signal<Category[]>([]);
  private readonly storageKey = 'categories';

  /** All categories */
  public readonly categories = this._categories.asReadonly();

  public categoryFilters = signal<string[]>([]);

  constructor(private localStorage: LocalStorageService) {
    this._categories.set(
      this.localStorage.getItem<Category[]>(this.storageKey) ?? []
    );
  }

  /** Computed categories to map the ide with the name, for quick access */
  public readonly categoryMap = computed<Record<string, string>>(() =>
    this._categories().reduce((map, cat) => {
      map[cat.id] = cat.name;
      return map;
    }, {} as Record<string, string>)
  );

  public addCategory(category: Category): void {
    const categories = this._categories();
    this._categories.set([...categories, category]);

    this.localStorage.setItem(this.storageKey, this._categories());
  }

  public removeCategory(category: Category): void {
    const categories = this._categories();
    this._categories.set(categories.filter((cat) => cat.id !== category.id));

    this.localStorage.setItem(this.storageKey, this._categories());
  }
}
