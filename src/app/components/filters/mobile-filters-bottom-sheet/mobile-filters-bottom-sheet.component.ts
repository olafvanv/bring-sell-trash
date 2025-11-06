import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../models/category.interface';
import { MOVE_DECISIONS } from '../../../models/move-state.enum';
import { CategoryService } from '../../../services/category.service';
import { ItemFiltersService } from '../../../services/item-filters.service';

@Component({
  selector: 'app-mobile-filters-bottom-sheet',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './mobile-filters-bottom-sheet.component.html',
  styleUrl: './mobile-filters-bottom-sheet.component.scss',
})
export class MobileFiltersBottomSheetComponent {
  public categories: Signal<Category[]>;
  public selectedCategories: Signal<string[]>;

  public decisions = MOVE_DECISIONS;
  public selectedDecisions: Signal<string[]>;

  public hasActiveFilters: Signal<boolean>;

  constructor(
    private itemFilterService: ItemFiltersService,
    private categoryService: CategoryService,
    private bottomSheetRef: MatBottomSheetRef<MobileFiltersBottomSheetComponent>
  ) {
    this.categories = this.categoryService.categories;
    this.hasActiveFilters = this.itemFilterService.hasActiveFilters;

    this.selectedCategories = this.itemFilterService.selectedCategories;
    this.selectedDecisions = this.itemFilterService.selectedState;
  }

  public clearAllFilters() {
    this.itemFilterService.resetFilters();
  }

  public closeSheet() {
    this.bottomSheetRef.dismiss();
  }
}
