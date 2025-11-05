import { Component, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { FiltersComponent } from '../../components/filters/filters.component';
import { MoveItemsOverviewComponent } from '../../components/move-items-overview/move-items-overview.component';
import { MoveItemFilters } from '../../models/item-filters.type';
import { MoveItem } from '../../models/move-item.model';
import { ItemsFilterPipe } from '../../pipes/items-filter.pipe';
import { AuthenticationService } from '../../services/authentication.service';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-move-items',
  imports: [
    MoveItemsOverviewComponent,
    FiltersComponent,
    ItemsFilterPipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './move-items.component.html',
  styleUrl: './move-items.component.scss',
})
export class MoveItemsComponent {
  public items: Signal<MoveItem[]>;
  public selectedFilters = signal<MoveItemFilters>({} as MoveItemFilters);

  constructor(
    private itemsService: ItemsService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.items = this.itemsService.items;
  }

  onFilterChange(filters: MoveItemFilters) {
    this.selectedFilters.set(filters);
  }

  public logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
