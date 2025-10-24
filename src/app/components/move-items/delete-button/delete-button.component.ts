import { Component, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-button',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
})
export class DeleteButtonComponent {
  public delete = output<boolean>();

  public showConfirm = signal(false);

  public onDelete() {
    this.showConfirm.set(true);
  }

  public confirm() {
    this.delete.emit(true);
  }

  public cancel() {
    this.showConfirm.set(false);
  }
}
