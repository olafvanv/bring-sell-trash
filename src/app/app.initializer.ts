import { inject } from '@angular/core';
import { take } from 'rxjs';
import { CategoryService } from './services/category.service';

export const appInitializer = () => {
  const categoryService = inject(CategoryService);
  return categoryService.getCategories().pipe(take(1));
};
