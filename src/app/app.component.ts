import { Component, signal, Signal } from '@angular/core';
import { FiltersComponent } from './components/filters/filters.component';
import { MoveItemsComponent } from './components/move-items/move-items.component';
import { MoveItemFilters } from './models/item-filters.type';
import { MoveItem } from './models/move-item.model';
import { ItemsFilterPipe } from './pipes/items-filter.pipe';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  imports: [MoveItemsComponent, FiltersComponent, ItemsFilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public items: Signal<MoveItem[]>;
  public selectedFilters = signal<MoveItemFilters>({} as MoveItemFilters);

  constructor(private itemsService: ItemsService) {
    this.items = this.itemsService.items;
  }

  onFilterChange(filters: MoveItemFilters) {
    this.selectedFilters.set(filters);
  }
}
