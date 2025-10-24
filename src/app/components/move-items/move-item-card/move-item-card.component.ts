import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MoveItem } from '../../../models/move-item.model';
import { DecisionLabelPipe } from '../../../pipes/decision-label.pipe';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';

@Component({
  selector: 'app-move-item-card',
  imports: [MatCardModule, DeleteButtonComponent, DecisionLabelPipe],
  templateUrl: './move-item-card.component.html',
  styleUrl: './move-item-card.component.scss',
})
export class MoveItemCardComponent {
  public item = input.required<MoveItem>();

  public onDelete() {
    console.log('Delete item');
  }
}
