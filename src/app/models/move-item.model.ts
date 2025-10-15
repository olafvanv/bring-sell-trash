import { MoveDecision } from './move-state.enum';

export interface MoveItem {
  id?: string;
  name: string;
  categoryId: string | null;
  categoryName?: string | null;
  state: MoveDecision | null;
}
