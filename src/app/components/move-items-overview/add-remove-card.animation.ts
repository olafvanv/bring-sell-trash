import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const ADD_REMOVE_CARD_ANIMATION = [
  trigger('addRemoveCard', [
    transition(':enter', [
      query(
        '.card-wrapper',
        [animate('300ms ease', style({ opacity: 1, transform: 'scale(1)' }))],
        { optional: true }
      ),
    ]),
    transition(':leave', [
      group([
        query('.move-item-card', [
          style({ opacity: 1, transform: 'scale(1)' }),
          animate('300ms ease', style({ opacity: 0, transform: 'scale(0)' })),
        ]),
      ]),
    ]),
  ]),
];
