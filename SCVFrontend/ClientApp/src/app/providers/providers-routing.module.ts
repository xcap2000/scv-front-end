import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers.component';
import { CreateProviderComponent } from '../create-provider/create-provider.component';
import { EditProviderComponent } from '../edit-provider/edit-provider.component';
import { DeleteProviderComponent } from '../delete-provider/delete-provider.component';
import { AuthorizedGuard } from '../authorized.guard';

const routes: Routes = [
  { path: 'providers', component: ProvidersComponent, canActivate: [AuthorizedGuard] },
  { path: 'providers/create', component: CreateProviderComponent, canActivate: [AuthorizedGuard] },
  { path: 'providers/edit/:id', component: EditProviderComponent, canActivate: [AuthorizedGuard] },
  { path: 'providers/delete/:id', component: DeleteProviderComponent, canActivate: [AuthorizedGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
