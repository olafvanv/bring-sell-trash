import { computed, Injectable, signal } from '@angular/core';
import { MoveItemFilters } from '../models/item-filters.type';

@Injectable({ providedIn: 'root' })
export class ItemFiltersService {
  public selectedCategories = signal<string[]>([]);
  public selectedState = signal<string[]>([]);

  public selectedFilters = computed<MoveItemFilters>(() => {
    const categories = this.selectedCategories();
    const state = this.selectedState();

    return {
      categoryId: categories,
      state: state,
    };
  });

  public hasActiveFilters = computed<boolean>(() => {
    return !!Object.keys(this.selectedFilters)?.length;
  });

  constructor() {}

  public resetFilters() {
    this.selectedCategories.set([]);
    this.selectedState.set([]);
  }
}
