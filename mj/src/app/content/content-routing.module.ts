import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OfficetasksComponent } from './components/tasks/officetasks/officetasks.component';
import { HometasksComponent } from './components/tasks/hometasks/hometasks.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { OfficetaskformComponent } from './components/tasks/officetasks/officetaskform/officetaskform.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksformComponent } from './components/tasks/tasksform/tasksform.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'alltasks',
        children:[
          {
            path:'',component:TasksComponent
          },
          {
            path:'addtask',component:TasksformComponent
          },
          {
            path:'addtask/:taskid',component:TasksformComponent
          }
        ]
      },
      {
        path:'officetasks',
        children:[
          {
            path:'',component:OfficetasksComponent
          },
          {
            path:'addtask',component:OfficetaskformComponent
          },
          {
            path:'addtask/:officetaskid',component:OfficetaskformComponent
          }
        ]
      },
      {
        path:'hometasks',
        children:[
          {
            path:'',component:HometasksComponent
          }
        ]
      },
      // {
      //   path:'hometasks',component:HometasksComponent
      // }
    ]
  }
 
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
