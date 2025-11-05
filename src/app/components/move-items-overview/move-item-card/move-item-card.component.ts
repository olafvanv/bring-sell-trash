import { Component, computed, input, output } from '@angular/core';
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
  public delete = output<void>();

  public categoryColors = computed<{ border: string; background: string }>(
    () => {
      const item = this.item();
      const hex = item.category.color;

      // Convert hex color (like "#1E88E5") to rgba string
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const background = `rgba(${r}, ${g}, ${b}, 0.5)`;

      return {
        border: hex,
        background,
      };
    }
  );

  public onDelete() {
    this.delete.emit();
  }
}
