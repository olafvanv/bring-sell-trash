import { Pipe, PipeTransform } from '@angular/core';
import { MoveItem } from '../models/move-item.model';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(items: MoveItem[], filters: string[]): MoveItem[] {
    if (!items) return [];

    if (filters.length) {
      return items.filter((item) => filters.includes(item.categoryId!));
    }

    return items;
  }
}
