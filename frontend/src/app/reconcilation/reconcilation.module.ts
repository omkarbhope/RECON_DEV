import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReconcilationRoutingModule } from './reconcilation-routing.module';
import { DefineReconcilationComponent } from './define-reconcilation/define-reconcilation.component';


@NgModule({
  declarations: [DefineReconcilationComponent],
  imports: [
    CommonModule,
    ReconcilationRoutingModule
  ]
})
export class ReconcilationModule { }
