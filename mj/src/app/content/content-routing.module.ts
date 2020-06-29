import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OfficetasksComponent } from './components/tasks/officetasks/officetasks.component';
import { HometasksComponent } from './components/tasks/hometasks/hometasks.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { OfficetaskformComponent } from './components/tasks/officetasks/officetaskform/officetaskform.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksformComponent } from './components/tasks/tasksform/tasksform.component';
import { TaskscategoryviewComponent } from './components/tasks/taskscategoryview/taskscategoryview.component';
import { TaskscategoryviewformComponent } from './components/tasks/taskscategoryview/taskscategoryviewform/taskscategoryviewform.component';
import { TaskscategorystartenddateComponent } from './components/tasks/taskscategorystartenddate/taskscategorystartenddate.component';
import { TaskcategorystartenddateformComponent } from './components/tasks/taskscategorystartenddate/taskcategorystartenddateform/taskcategorystartenddateform.component';


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
          },
          {
            path:'category/:categoryid/:duedate',component:TaskscategoryviewComponent
          },
          {
            path:'category/:categoryid/:duedate/addtask',component:TaskscategoryviewformComponent
          },
          {
            path:'category/:categoryid/:duedate/addtask/:taskid',component:TaskscategoryviewformComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate',component:TaskscategorystartenddateComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate/addtask',component:TaskcategorystartenddateformComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate/addtask/:taskid',component:TaskcategorystartenddateformComponent
          },
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
