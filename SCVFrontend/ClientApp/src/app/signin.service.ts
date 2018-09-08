import { Injectable, Inject } from '@angular/core';
import { SignInModel } from './signin.model';
import { SignInResponseModel } from './signin-response.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class SignInService extends BaseService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    super();
  }

  public signIn(signInModel: SignInModel): Observable<SignInResponseModel> {
    return this.http.post<SignInResponseModel>(this.baseUrl + 'signin', signInModel, { headers: this.getDefaultHeaders() });
  }

}