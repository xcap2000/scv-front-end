import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';


@Injectable()
export class AuthorizedGuard implements CanActivate {

  public constructor(
    private router: Router,
    private authorizationService: AuthorizationService) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.authorizationService.isAuthorized()) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}