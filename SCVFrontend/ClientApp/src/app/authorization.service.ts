import { Injectable } from '@angular/core';
import { SignInResponseModel } from './signin-response.model';

@Injectable()
export class AuthorizationService {

  public authorize(signInResponseModel: SignInResponseModel): void {
    localStorage.setItem('token', signInResponseModel.token);
    localStorage.setItem('userId', signInResponseModel.userId);
    localStorage.setItem('userType', signInResponseModel.userType.toString());
    localStorage.setItem('userName', signInResponseModel.userName);
    localStorage.setItem('photo', signInResponseModel.photo);
  }

  public removeAuthorization(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('photo');
  }

  public isAuthorized(): boolean {
    return this.getToken() !== null;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUserId(): string {
    return localStorage.getItem('userId');
  }

  public getUserType(): number {
    return parseInt(localStorage.getItem('userType'));
  }

  public getUserName(): string {
    return localStorage.getItem('userName');
  }

  public getPhoto(): string {
    return localStorage.getItem('photo');
  }

}
