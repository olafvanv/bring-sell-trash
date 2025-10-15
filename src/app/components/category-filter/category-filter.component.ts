import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../services/category.service';
import { ItemsService } from '../../services/items.service';
import { ManageCategoriesComponent } from '../manage-categories/manage-categories.component';

@Component({
  selector: 'app-category-filter',
  imports: [MatChipsModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  public categories: Signal<Category[]>;
  public selectedFilters: string[] = [];

  constructor(
    private categoryService: CategoryService,
    private itemsService: ItemsService,
    private dialog: MatDialog
  ) {
    this.categories = this.categoryService.categories;
  }

  public manageCategories() {
    this.dialog.open(ManageCategoriesComponent, { minWidth: '400px' });
  }

  public clearFilters() {
    this.selectedFilters = [];
    this.categoryService.categoryFilters.set([]);
    this.itemsService.filters.update((filters) => {
      return {
        ...filters,
        categoryId: [],
      };
    });
  }

  public filtersChanged(event: MatChipListboxChange) {
    this.itemsService.filters.update((filters) => ({
      ...filters,
      categoryId: event.value,
    }));
  }
}
