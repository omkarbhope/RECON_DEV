import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefineReconcilationComponent } from './define-reconcilation/define-reconcilation.component';

const routes: Routes = [
  {
    path: 'define_reconcilation',
    component: DefineReconcilationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconcilationRoutingModule { }
