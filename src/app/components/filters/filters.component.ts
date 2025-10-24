import {
  Component,
  computed,
  effect,
  output,
  signal,
  Signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../models/category.interface';
import { MoveItemFilters } from '../../models/item-filters.type';
import { MOVE_DECISIONS } from '../../models/move-state.enum';
import { CategoryService } from '../../services/category.service';
import { ManageCategoriesComponent } from '../manage-categories/manage-categories.component';

@Component({
  selector: 'app-filters',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  public filterChange = output<MoveItemFilters>();

  public categories: Signal<Category[]>;
  public selectedCategories = signal<string[]>([]);

  public decisions = MOVE_DECISIONS;
  public selectedDecisions = signal<string[]>([]);

  public hasActiveFilters = computed(() => {
    return this.selectedCategories().length || this.selectedDecisions().length;
  });

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {
    this.categories = this.categoryService.categories;

    effect(() => {
      const categories = this.selectedCategories();
      const decisions = this.selectedDecisions();

      this.filterChange.emit({
        categoryId: categories,
        state: decisions,
      });
    });
  }

  public clearAllFilters() {
    this.selectedCategories.set([]);
    this.selectedDecisions.set([]);
  }

  public manageFilters() {
    this.dialog.open(ManageCategoriesComponent, { minWidth: '400px' });
  }
}
