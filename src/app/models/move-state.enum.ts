export enum MoveDecision {
  BRING = 'Bring',
  SELL = 'Sell',
  TRASH = 'Trash',
}

export const MOVE_DECISIONS: { label: string; value: MoveDecision }[] = [
  { label: '🚛 Bring', value: MoveDecision.BRING },
  { label: '💰 Sell', value: MoveDecision.SELL },
  { label: '🗑️ Trash', value: MoveDecision.TRASH },
];
