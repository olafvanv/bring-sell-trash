import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public user$: Observable<User | null>;
  public currentUser: Signal<User | null | undefined>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
    this.currentUser = toSignal(user(this.auth));
  }

  public loginWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }

  public logout() {
    return from(signOut(this.auth));
  }
}
