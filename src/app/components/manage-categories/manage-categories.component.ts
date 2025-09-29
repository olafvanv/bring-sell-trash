import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
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
  ],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.scss',
  animations: [LIST_ITEM_ANIMATION],
})
export class ManageCategoriesComponent {
  public categories: Signal<Category[]>;
  public newCategoryName = '';

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.categories;
  }

  public removeCategory(category: Category): void {
    this.categoryService.removeCategory(category);
  }

  public addCategory(): void {
    if (!this.canAddCategory()) return;

    this.categoryService.addCategory({
      id: crypto.randomUUID(),
      name: this.newCategoryName.trim(),
    });

    this.newCategoryName = '';
  }

  public canAddCategory(): boolean {
    return this.newCategoryName.trim().length > 0;
  }
}
