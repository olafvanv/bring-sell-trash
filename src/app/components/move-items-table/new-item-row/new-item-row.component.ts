import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../models/category.interface';
import { MoveItem } from '../../../models/move-item.model';
import { MOVE_DECISIONS } from '../../../models/move-state.enum';
import { CategoryService } from '../../../services/category.service';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: '[new-item-row]',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonToggleModule,
    MatButtonModule,
  ],
  templateUrl: './new-item-row.component.html',
  styleUrl: './new-item-row.component.scss',
})
export class NewItemRowComponent {
  public newItem: Pick<MoveItem, 'name' | 'categoryId' | 'state'> = {
    name: '',
    categoryId: null,
    state: null,
  };
  public categories: Signal<Category[]>;
  public moveDecisions = MOVE_DECISIONS;

  constructor(
    private categoryService: CategoryService,
    private itemsService: ItemsService
  ) {
    this.categories = this.categoryService.categories;
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
}
