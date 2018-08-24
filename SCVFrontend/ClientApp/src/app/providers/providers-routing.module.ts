import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers.component';
import { CreateProviderComponent } from '../create-provider/create-provider.component';
import { EditProviderComponent } from '../edit-provider/edit-provider.component';
import { DeleteProviderComponent } from '../delete-provider/delete-provider.component';

const routes: Routes = [
  { path: 'providers', component: ProvidersComponent },
  { path: 'providers/create', component: CreateProviderComponent },
  { path: 'providers/edit/:id', component: EditProviderComponent },
  { path: 'providers/delete/:id', component: DeleteProviderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
