import { Injectable, Inject } from '@angular/core';
import { SignInModel } from './signin.model';
import { SignInResponseModel } from './signin-response.model';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class SignInService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  public signIn(signInModel: SignInModel): Observable<SignInResponseModel> {
    return this.http.post<SignInResponseModel>(this.baseUrl + 'signin', signInModel, { headers: this.getDefaultHeaders() });
  }

  // TODO - Remove duplication, inheritance maybe?
  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', ['application/json', 'charset=utf-8']);
  }

}