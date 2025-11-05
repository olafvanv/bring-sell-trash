import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'move-items',
    loadComponent: () =>
      import('./pages/move-items/move-items.component').then(
        (m) => m.MoveItemsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'move-items',
    pathMatch: 'full',
  },
];
