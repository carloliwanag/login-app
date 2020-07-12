import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private usersSvc: UsersService, private router: Router) {}

  canActivate(): boolean {
    if (!this.usersSvc.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
