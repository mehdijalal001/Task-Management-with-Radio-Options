import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OfficetasksComponent } from './components/tasks/officetasks/officetasks.component';
import { HometasksComponent } from './components/tasks/hometasks/hometasks.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { OfficetaskformComponent } from './components/tasks/officetasks/officetaskform/officetaskform.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'officetasks',
        children:[
          {
            path:'',component:OfficetasksComponent
          },
          {
            path:'addtask',component:OfficetaskformComponent
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
