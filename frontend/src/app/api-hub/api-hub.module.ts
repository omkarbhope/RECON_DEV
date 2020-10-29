import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiHubRoutingModule } from './api-hub-routing.module';
import { DefineStandardApiDefinitionComponent } from './define-standard-api-definition/define-standard-api-definition.component';


@NgModule({
  declarations: [DefineStandardApiDefinitionComponent],
  imports: [
    CommonModule,
    ApiHubRoutingModule
  ]
})
export class ApiHubModule { }
