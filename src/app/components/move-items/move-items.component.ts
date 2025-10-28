import { Component, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MoveItem } from '../../models/move-item.model';
import { ItemsService } from '../../services/items.service';
import { ADD_REMOVE_CARD_ANIMATION } from './add-remove-card.animation';
import { MoveItemCardComponent } from './move-item-card/move-item-card.component';

@Component({
  selector: 'app-move-items',
  imports: [MatGridListModule, MoveItemCardComponent, MatIconModule],
  templateUrl: './move-items.component.html',
  styleUrl: './move-items.component.scss',
  animations: [ADD_REMOVE_CARD_ANIMATION],
})
export class MoveItemsComponent {
  public items = input.required<MoveItem[]>();

  constructor(private itemsService: ItemsService) {}

  public deleteItem(item: MoveItem) {
    console.log('Delete item', item);
    this.itemsService.removeItem(item);
  }

  public addNewItem() {}
}
