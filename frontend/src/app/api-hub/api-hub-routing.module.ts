import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefineStandardApiDefinitionComponent } from './define-standard-api-definition/define-standard-api-definition.component';

const routes: Routes = [
  {
    path: 'define-standard-api-definition',
    component: DefineStandardApiDefinitionComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiHubRoutingModule { } 
