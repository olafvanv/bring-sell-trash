import { animate, style, transition, trigger } from '@angular/animations';

export const LIST_ITEM_ANIMATION = trigger('listItem', [
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '300ms ease',
      style({ transform: 'translateY(-10px)', opacity: 0 })
    ),
  ]),
  transition(':enter', [
    style({ transform: 'translateY(-10px)', opacity: 0 }),
    animate('300ms ease', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
]);
