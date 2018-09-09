import { Component, OnInit } from '@angular/core';
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

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  public ngOnInit(): void {
    this.providerService.getById(this.id)
      .subscribe(
        providerEditModel => {
          this.provider = providerEditModel;
        },
        error => console.log(error)
      );
  }

  public edit(): void {
    this.providerService.put(this.provider)
      .subscribe(
        () => {
          this.router.navigate(['/providers']);
        },
        error => console.log(error)
      );
  }
}