import { Component } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public isExpanded = false;

  public constructor(
    private router: Router,
    private authorizationService: AuthorizationService) { }

  public collapse(): void {
    this.isExpanded = false;
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public showLogin(): boolean {
    return this.authorizationService.isAuthorized();
  }

  public signOut(): void {
    this.authorizationService.removeAuthorization();
    this.router.navigate(['/home']);
  }

  public name(): string {
    return this.authorizationService.getUserName();
  }

  public photo(): string {
    return this.authorizationService.getPhoto();
  }

}