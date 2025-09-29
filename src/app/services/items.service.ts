import { Injectable, signal } from '@angular/core';
import { MoveItem } from '../models/move-item.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _items = signal<MoveItem[]>([]);

  public items = this._items.asReadonly();

  private readonly storageKey = 'moveItems';

  constructor(private localStorage: LocalStorageService) {
    this._items.set(
      this.localStorage.getItem<MoveItem[]>(this.storageKey) ?? []
    );
  }

  public addItem(item: MoveItem): void {
    const items = this._items();
    this._items.set([item, ...items]);

    this.localStorage.setItem(this.storageKey, this._items());
  }

  public removeItem(item: MoveItem): void {
    const items = this._items();
    this._items.set(items.filter((i) => i.id !== item.id));

    this.localStorage.setItem(this.storageKey, this._items());
  }
}
