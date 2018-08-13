import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import { ProviderListModel } from '../provider-list.model';


@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  private isLoading: boolean = false;
  public totalCount: number = 0;
  public currentPage: number = 1;
  public providers: ProviderListModel[] = [];

  public constructor(
    private providerService: ProviderService) { }

  public ngOnInit() {
    this.getProviders();
  }

  public showGrid(): boolean {
    return this.providers.length > 0;
  }

  public showLoading(): boolean {
    return this.isLoading;
  }

  // TODO - Implement and test.
  /*
  public pageChanged(event: any) {
    this.page = event.page;
  }
  */

  private getProviders() {
    this.isLoading = true;
    this.providerService.get()
      .subscribe(
        pagedResult => {
          this.totalCount = pagedResult.totalCount;
          this.providers = pagedResult.items;
          this.isLoading = false;
        },
        error => console.log(error)
      );
  }
}