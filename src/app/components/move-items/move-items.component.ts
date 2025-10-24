import { Component, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MoveItem } from '../../models/move-item.model';
import { MoveItemCardComponent } from './move-item-card/move-item-card.component';

@Component({
  selector: 'app-move-items',
  imports: [MatGridListModule, MoveItemCardComponent],
  templateUrl: './move-items.component.html',
  styleUrl: './move-items.component.scss',
})
export class MoveItemsComponent {
  public items = input.required<MoveItem[]>();
}
