import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { ProviderService } from '../provider.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { CreateProviderComponent } from '../create-provider/create-provider.component';
import { EditProviderComponent } from '../edit-provider/edit-provider.component';
import { DeleteProviderComponent } from '../delete-provider/delete-provider.component';

@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  declarations: [ProvidersComponent, CreateProviderComponent, EditProviderComponent, DeleteProviderComponent],
  providers: [ProviderService]
})
export class ProvidersModule { }
