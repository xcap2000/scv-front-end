import { Component, OnInit } from '@angular/core';
import { ProviderListModel, ProviderService } from '../provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  providers: ProviderListModel[] = [];

  constructor(private providerService: ProviderService) {
  }

  ngOnInit() {
      this.getProviders();
  }

  private getProviders() {
    this.providerService.getProviders()
      .subscribe(
        (providers) => this.providers = providers,
        (error) => console.log(error)
      );
  }

  showGrid(): boolean {
    return this.providers.length > 0;
  }
}