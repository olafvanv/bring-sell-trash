import { Component, effect, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../models/category.interface';
import { MoveItemFilters } from '../../models/item-filters.type';
import { MoveItem } from '../../models/move-item.model';
import { CategoryNamePipe } from '../../pipes/category-name.pipe';
import { DecisionLabelPipe } from '../../pipes/decision-label.pipe';
import { ItemsFilterPipe } from '../../pipes/items-filter.pipe';
import { CategoryService } from '../../services/category.service';
import { ItemsService } from '../../services/items.service';
import { LIST_ITEM_ANIMATION } from '../../utils/animations/list-item.animation';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { NewItemRowComponent } from './new-item-row/new-item-row.component';

@Component({
  selector: 'app-move-items-table',
  imports: [
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CategoryNamePipe,
    MatDialogModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NewItemRowComponent,
    DecisionLabelPipe,
    ItemsFilterPipe,
    DeleteButtonComponent,
  ],
  templateUrl: './move-items-table.component.html',
  styleUrl: './move-items-table.component.scss',
  animations: [LIST_ITEM_ANIMATION],
})
export class MoveItemsTableComponent {
  public items: Signal<MoveItem[]>;

  public newItem: Pick<MoveItem, 'name' | 'categoryId' | 'state'> = {
    name: '',
    categoryId: null,
    state: null,
  };
  public categories: Signal<Category[]>;
  public selectedFilters: Signal<MoveItemFilters>;

  constructor(
    private categoryService: CategoryService,
    private itemsService: ItemsService
  ) {
    this.categories = this.categoryService.categories;
    this.items = this.itemsService.items;
    this.selectedFilters = this.itemsService.filters;

    effect(() => {
      console.log(this.items());
    });
  }

  get newItemIsValid(): boolean {
    return (
      this.newItem.name.trim().length > 0 &&
      !!this.newItem.categoryId &&
      !!this.newItem.state
    );
  }

  public addItem() {
    const categoryName = this.categories().find(
      (cat) => cat.id === this.newItem.categoryId
    )?.name;

    if (!categoryName) {
      console.error('Invalid category ID');
      return;
    }

    const newItem: MoveItem = {
      name: this.newItem.name.trim(),
      categoryId: this.newItem.categoryId,
      categoryName: categoryName,
      state: this.newItem.state,
    };

    this.itemsService.addItem(newItem);

    this.newItem = {
      name: '',
      categoryId: null,
      state: null,
    };
  }

  public removeItem(item: MoveItem) {
    this.itemsService.removeItem(item);
  }
}
