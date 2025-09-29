import { UUID } from 'crypto';
import { MoveState } from './move-state.enum';

interface IMoveItem {
  id: UUID;
  name: string;
  categoryId: string | null;
  state: MoveState | null;
}

export class MoveItem implements IMoveItem {
  constructor(
    public id: UUID,
    public name: string,
    public categoryId: string | null,
    public state: MoveState | null
  ) {}

  public get isValid(): boolean {
    return this.name.trim().length > 0 && !!this.categoryId && !!this.state;
  }

  static createEmpty(): MoveItem {
    const uuid = crypto.randomUUID();
    return new MoveItem(uuid, '', null, null);
  }
}
