import { Component, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MoveItem } from '../../models/move-item.model';
import { ItemsService } from '../../services/items.service';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { ADD_REMOVE_CARD_ANIMATION } from './add-remove-card.animation';
import { MoveItemCardComponent } from './move-item-card/move-item-card.component';

@Component({
  selector: 'app-move-items-overview',
  imports: [
    MatGridListModule,
    MoveItemCardComponent,
    MatIconModule,
    AddNewItemComponent,
  ],
  templateUrl: './move-items-overview.component.html',
  styleUrl: './move-items-overview.component.scss',
  animations: [ADD_REMOVE_CARD_ANIMATION],
})
export class MoveItemsOverviewComponent {
  public items = input.required<MoveItem[]>();

  constructor(private itemsService: ItemsService) {}

  public deleteItem(item: MoveItem) {
    this.itemsService.removeItem(item);
  }

  public addNewItem(item: MoveItem) {
    this.itemsService.addItem(item);
  }
}
