import { Pipe, PipeTransform } from '@angular/core';
import { MoveItemFilters } from '../models/item-filters.type';
import { MoveItem } from '../models/move-item.model';

@Pipe({
  name: 'itemsFilter',
})
export class ItemsFilterPipe implements PipeTransform {
  transform(items: MoveItem[], filter: MoveItemFilters): MoveItem[] {
    if (!filter) {
      return items;
    }

    return items.filter((item) => {
      return Object.entries(filter).every(([key, values]) => {
        if (!values || values.length === 0) {
          return true;
        }

        const itemKey = key as keyof Omit<
          MoveItem,
          'createdAt' | 'id' | 'category'
        >;
        return values.includes(item[itemKey]!);
      });
    });
  }
}
