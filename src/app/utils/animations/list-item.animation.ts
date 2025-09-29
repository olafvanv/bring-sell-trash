import { animate, style, transition, trigger } from '@angular/animations';

export const LIST_ITEM_ANIMATION = trigger('listItem', [
  transition(':leave', [
    style({ height: '*', opacity: 1 }),
    animate('200ms ease-in', style({ height: '0px', opacity: 0 })),
  ]),
  transition(':enter', [
    style({ height: '0px', opacity: 0 }),
    animate('200ms ease-out', style({ height: '*', opacity: 1 })),
  ]),
]);
