import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { LevelComponent } from './level/level.component';

const routes: Routes = [
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'level',
    component: LevelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
