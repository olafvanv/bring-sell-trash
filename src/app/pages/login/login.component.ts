import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe((user) => {
      if (!user) return;

      const returnUrl = this.route.snapshot.queryParams['returnUrl'];
      this.router.navigateByUrl(returnUrl ? returnUrl : '/move-items');
    });
  }
}
