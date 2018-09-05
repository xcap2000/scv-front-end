import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {

  public authorize(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeAuthorization(): void {
    localStorage.removeItem('token');
  }

  public isAuthorized(): boolean {
    return this.getToken() !== null;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

}
