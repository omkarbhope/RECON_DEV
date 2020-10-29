import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UomComponent } from './uom/uom.component';
import { CurrencyComponent } from './currency/currency.component';
import { LocationComponent } from './location/location.component';
import { TermComponent } from './term/term.component';
import { UserformComponent } from './userform/userform.component';

const routes: Routes = [
  {
    path: 'uom',
    component: UomComponent
  },
  {
    path: 'currency', 
    component: CurrencyComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },    
  {
    path: 'term',
    component: TermComponent
  },
  {
    path: 'userform',
    component: UserformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonSetupRoutingModule { }
