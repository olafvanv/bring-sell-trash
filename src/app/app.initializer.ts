import { inject } from '@angular/core';
import { delay, take, tap } from 'rxjs';
import { CategoryService } from './services/category.service';

export const appInitializer = () => {
  const categoryService = inject(CategoryService);
  return categoryService.getCategories().pipe(
    take(1),
    delay(1000000),
    tap(() => {
      console.log('Categories loaded');
    })
  );
};
