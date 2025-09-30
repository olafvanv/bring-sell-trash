import { MoveState } from './move-state.enum';

export interface MoveItem {
  id?: string;
  name: string;
  categoryId: string | null;
  categoryName?: string | null;
  state: MoveState | null;
}

// export class MoveItem implements IMoveItem {
//   constructor(
//     public id: string,
//     public name: string,
//     public categoryId: string | null,
//     public categoryName: string | null,
//     public state: MoveState | null
//   ) {}

//   public get isValid(): boolean {
//     return this.name.trim().length > 0 && !!this.categoryId && !!this.state;
//   }

//   static createEmpty(): MoveItem {
//     const uuid = crypto.randomUUID();
//     return new MoveItem(uuid, '', null, null, null);
//   }
// }
