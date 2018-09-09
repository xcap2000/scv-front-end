import { Component } from '@angular/core';
import { SignInModel } from '../signin.model';
import { Router } from '@angular/router';
import { SignInService } from '../signin.service';
import { AuthorizationService } from '../authorization.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent {

  public signInModel: SignInModel = { email: '', password: '' };

  constructor(private router: Router,
    private signInService: SignInService,
    private authorizationService: AuthorizationService) { }

  public signIn(): void {
    this.signInService.signIn(this.signInModel)
      .subscribe(
        async signInResponseModel => {
          this.authorizationService.authorize(signInResponseModel);
          await this.router.navigate(['/home']);
        },
        error => console.log(error)
      );
  }
}