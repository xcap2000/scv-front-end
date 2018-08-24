import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../spinner.service';
import { ProviderService } from '../provider.service';
import { ProviderDeleteModel } from '../provider-delete.model';
import { ProviderEditModel } from '../provider-edit.model';

@Component({
  selector: 'app-delete-provider',
  templateUrl: './delete-provider.component.html',
  styleUrls: ['./delete-provider.component.css']
})
export class DeleteProviderComponent implements OnInit {

  private id: string = '';
  public provider: ProviderEditModel = { id: '', name: '', baseApiUrl: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private providerService: ProviderService) {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

  ngOnInit() {
    this.spinnerService.show();
    this.providerService.getById(this.id)
      .subscribe(
        providerEditModel => {
          this.provider = providerEditModel;
          this.spinnerService.hide();
        },
        error => console.log(error)
      );
  }

  public delete() {
    this.spinnerService.show();
    this.providerService.delete(this.id)
      .subscribe(
        () => {
          this.spinnerService.hide();
          this.router.navigate(['/providers']);
        },
        error => console.log(error)
      );
  }

}