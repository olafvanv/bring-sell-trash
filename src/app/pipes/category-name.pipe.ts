import { inject, Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Pipe({
  name: 'categoryName',
})
export class CategoryNamePipe implements PipeTransform {
  private categoryService = inject(CategoryService);

  transform(id: string | null): string {
    if (!id) return '';

    return this.categoryService.categoryMap()[id] || 'Unknown';
  }
}
