import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from '../provider.service';
import { ProviderEditModel } from '../provider-edit.model';


@Component({
  selector: 'app-delete-provider',
  templateUrl: './delete-provider.component.html',
  styleUrls: ['./delete-provider.component.css']
})
export class DeleteProviderComponent implements OnInit {

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

  public delete(): void {
    this.providerService.delete(this.id)
      .subscribe(
        () => {
          this.router.navigate(['/providers']);
        },
        error => console.log(error)
      );
  }
}