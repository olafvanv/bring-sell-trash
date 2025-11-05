import { HttpClient } from '@angular/common/http';
import { effect, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public user$: Signal<User | null> = signal<User | null>(null);
  public user: Observable<User | null>;

  constructor(private http: HttpClient, private auth: Auth) {
    this.user$ = toSignal(user(this.auth), { initialValue: null });
    this.user = user(this.auth);

    effect(() => console.log(this.user$()));
  }

  public loginWithEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public loginWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }

  public logout() {
    return from(signOut(this.auth));
  }
}
