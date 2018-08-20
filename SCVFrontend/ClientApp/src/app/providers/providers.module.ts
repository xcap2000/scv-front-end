import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { ProviderService } from '../provider.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  declarations: [ProvidersComponent],
  providers: [ProviderService]
})
export class ProvidersModule { }
