import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../models/category.interface';
import { MoveItem } from '../../models/move-item.model';
import { CategoryFilterPipe } from '../../pipes/category-filter.pipe';
import { CategoryNamePipe } from '../../pipes/category-name.pipe';
import { CategoryService } from '../../services/category.service';
import { ItemsService } from '../../services/items.service';
import { LIST_ITEM_ANIMATION } from '../../utils/animations/list-item.animation';

@Component({
  selector: 'app-move-items-table',
  imports: [
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CategoryNamePipe,
    MatDialogModule,
    CategoryFilterPipe,
    MatButtonToggleModule,
  ],
  templateUrl: './move-items-table.component.html',
  styleUrl: './move-items-table.component.scss',
  animations: [LIST_ITEM_ANIMATION],
})
export class MoveItemsTableComponent {
  public items: Signal<MoveItem[]>;

  public newItem = MoveItem.createEmpty();
  public categories: Signal<Category[]>;
  public selectedFilters: Signal<string[]>;

  constructor(
    private categoryService: CategoryService,
    private itemsService: ItemsService
  ) {
    this.categories = this.categoryService.categories;
    this.items = this.itemsService.items;
    this.selectedFilters = this.categoryService.categoryFilters;
  }

  public addItem() {
    this.itemsService.addItem(this.newItem);
    this.newItem = MoveItem.createEmpty();
  }

  public removeItem(item: MoveItem) {
    this.itemsService.removeItem(item);
  }
}
