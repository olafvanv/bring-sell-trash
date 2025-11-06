import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { map } from 'rxjs';
import { Category } from '../../models/category.interface';
import { MOVE_DECISIONS } from '../../models/move-state.enum';
import { CategoryService } from '../../services/category.service';
import { ItemFiltersService } from '../../services/item-filters.service';
import { ManageCategoriesComponent } from '../manage-categories/manage-categories.component';
import { MobileFiltersBottomSheetComponent } from './mobile-filters-bottom-sheet/mobile-filters-bottom-sheet.component';

@Component({
  selector: 'app-filters',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatBadgeModule,
    MatBottomSheetModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  public categories: Signal<Category[]>;
  public selectedCategories: Signal<string[]>;

  public decisions = MOVE_DECISIONS;
  public selectedDecisions: Signal<string[]>;

  public hasActiveFilters: Signal<boolean>;
  public showMobileView: Signal<boolean>;

  constructor(
    private dialog: MatDialog,
    private itemFilterService: ItemFiltersService,
    private categoryService: CategoryService,
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet
  ) {
    this.categories = this.categoryService.categories;
    this.hasActiveFilters = this.itemFilterService.hasActiveFilters;

    this.selectedCategories = this.itemFilterService.selectedCategories;
    this.selectedDecisions = this.itemFilterService.selectedState;

    this.showMobileView = toSignal(
      this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map((update) => !!update.matches)),
      { initialValue: false }
    );
  }

  public clearAllFilters() {
    this.itemFilterService.resetFilters();
  }

  public manageFilters() {
    this.dialog.open(ManageCategoriesComponent, { minWidth: '350px' });
  }

  public openFilters() {
    this.bottomSheet.open(MobileFiltersBottomSheetComponent);
  }
}
