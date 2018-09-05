import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import { ProviderListModel } from '../provider-list.model';
import { SpinnerService } from '../spinner.service';


@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  public filter: string = null;
  public totalCount: number = 0;
  public currentPage: number = 1;
  public providers: ProviderListModel[] = [];

  public constructor(
    private spinnerService: SpinnerService,
    private providerService: ProviderService) { }

  public ngOnInit() {
    this.getProviders(this.filter, this.currentPage);
  }

  public showGrid(): boolean {
    return this.providers.length > 0;
  }

  public showEmptyMessage(): boolean {
    return this.providers.length == 0 && !this.spinnerService.showSpinner();
  }

  public pageChanged(event: any) {
    this.getProviders(this.filter, event.page);
  }

  public search() {
    this.currentPage = 1;
    this.getProviders(this.filter, this.currentPage)
  }

  public clear() {
    this.filter = null;
    this.currentPage = 1;
    this.getProviders(this.filter, this.currentPage)
  }

  private getProviders(filter: string, page: number) {
    this.providerService.get(filter, page)
      .subscribe(
        pagedResult => {
          this.totalCount = pagedResult.totalCount;
          this.providers = pagedResult.items;
          this.currentPage = page;
        },
        error => console.log(error)
      );
  }
}