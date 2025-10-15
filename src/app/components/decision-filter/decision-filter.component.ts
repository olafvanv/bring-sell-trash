import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MOVE_DECISIONS, MoveDecision } from '../../models/move-state.enum';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-decision-filter',
  imports: [MatChipsModule, FormsModule],
  templateUrl: './decision-filter.component.html',
  styleUrl: './decision-filter.component.scss',
})
export class DecisionFilterComponent {
  public decisions = MOVE_DECISIONS;
  public selectedFilters: MoveDecision[] = [];

  constructor(private itemsService: ItemsService) {}

  public filtersChanged(event: MatChipListboxChange) {
    this.itemsService.filters.update((filters) => ({
      ...filters,
      state: event.value,
    }));
  }
}
