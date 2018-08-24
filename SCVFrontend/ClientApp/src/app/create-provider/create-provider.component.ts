import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner.service';
import { ProviderEditModel } from '../provider-edit.model';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {

  public provider: ProviderEditModel = { name: '', baseApiUrl: '' };

  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private providerService: ProviderService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.providerService.getById()
      .subscribe(
        providerEditModel => {
          this.provider = providerEditModel;
          this.spinnerService.hide();
        },
        error => console.log(error)
      );
  }

  public create() {
    this.spinnerService.show();
    this.providerService.post(this.provider)
      .subscribe(
        () => {
          this.spinnerService.hide();
          this.router.navigate(['/providers']);
        },
        error => console.log(error)
      );
  }

}