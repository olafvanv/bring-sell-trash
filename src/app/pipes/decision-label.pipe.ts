import { Pipe, PipeTransform } from '@angular/core';
import { MOVE_DECISIONS, MoveDecision } from '../models/move-state.enum';

@Pipe({
  name: 'decisionLabel',
})
export class DecisionLabelPipe implements PipeTransform {
  transform(value: MoveDecision | null): string {
    return (
      MOVE_DECISIONS.find((decision) => decision.value === value)?.label ||
      'unknown'
    );
  }
}
