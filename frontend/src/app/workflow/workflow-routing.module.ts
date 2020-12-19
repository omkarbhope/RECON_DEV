import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { LevelComponent } from './level/level.component';
import { WorkflowComponent } from './workflow/workflow.component';

const routes: Routes = [
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'level',
    component: LevelComponent
  },
  {
    path: 'workflow',
    component: WorkflowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
