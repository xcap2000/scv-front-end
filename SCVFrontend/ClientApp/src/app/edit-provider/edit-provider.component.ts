import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import { ProviderService } from '../provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderEditModel } from '../provider-edit.model';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {

  private id: string = '';
  public provider: ProviderEditModel = { id: '', name: '', baseApiUrl: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService) {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

  ngOnInit() {
    this.providerService.getById(this.id)
      .subscribe(
        providerEditModel => {
          this.provider = providerEditModel;
        },
        error => console.log(error)
      );
  }

  public edit() {
    this.providerService.put(this.provider)
      .subscribe(
        () => {
          this.router.navigate(['/providers']);
        },
        error => console.log(error)
      );
  }

}
