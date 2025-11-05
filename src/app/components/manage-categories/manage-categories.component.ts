import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CATEGORY_COLORS } from '../../models/category-colors.const';
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../services/category.service';
import { LIST_ITEM_ANIMATION } from '../../utils/animations/list-item.animation';

@Component({
  standalone: true,
  selector: 'app-manage-categories',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
  ],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.scss',
  animations: [LIST_ITEM_ANIMATION],
})
export class ManageCategoriesComponent {
  public categories: Signal<Category[]>;
  public colors = CATEGORY_COLORS;
  public newCategory: Category = {
    name: '',
    color: '',
  };

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.categories;
  }

  public removeCategory(category: Category): void {
    this.categoryService.removeCategory(category);
  }

  public addCategory(): void {
    if (!this.canAddCategory()) return;

    this.categoryService.addCategory({
      name: this.newCategory.name.trim(),
      color: this.newCategory.color,
    });

    this.newCategory = {
      name: '',
      color: '',
    };
  }

  public canAddCategory(): boolean {
    const name = !!this.newCategory.name.trim() && !!this.newCategory.color;

    return (
      name &&
      this.categories().filter((c) => c.name === this.newCategory.name.trim())
        .length === 0
    );
  }
}
