import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftPanelComponent } from './left-panel/left-panel.component';



const routes: Routes = [
  {
    path: 'left-panel', 
    component: LeftPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSecurityRoutingModule { }
