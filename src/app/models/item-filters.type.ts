import { MoveItem } from './move-item.model';

export type MoveItemFilters = Partial<Record<keyof MoveItem, string[]>>;
