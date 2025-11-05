import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (_, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    map((user) => !!user),
    tap((authenticated) => {
      if (!authenticated) {
        console.warn('Not logged in, redirected to login page.');
        router.navigate(['/login']);
      }
    })
  );
};
