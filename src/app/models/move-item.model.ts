import { Timestamp } from '@angular/fire/firestore';
import { Category } from './category.interface';
import { MoveDecision } from './move-state.enum';

export interface MoveItem {
  id?: string;
  name: string;
  categoryId: string | null;
  category?: Category;
  state: MoveDecision | null;
  createdAt?: Timestamp;
}
