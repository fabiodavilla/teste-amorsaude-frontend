import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/states/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): boolean {
    const token = this.store.selectSnapshot(AuthState);

    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
