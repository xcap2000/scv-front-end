import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { ProviderService } from '../provider.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    PaginationModule.forRoot()
  ],
  declarations: [ProvidersComponent],
  providers: [ProviderService]
})
export class ProvidersModule { }
