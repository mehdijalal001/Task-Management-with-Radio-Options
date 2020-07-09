import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksformComponent } from './components/tasks/tasksform/tasksform.component';
import { TaskscalendarviewComponent } from './components/tasks/taskscalendarview/taskscalendarview.component';
import { TaskscalendarviewpcComponent } from './components/tasks/taskscalendarviewpc/taskscalendarviewpc.component';


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
            path:'calendar',component:TaskscalendarviewComponent
          },
          {
            path:'calendarpc',component:TaskscalendarviewpcComponent
          },
          {
            path:'calendar/updated',component:TaskscalendarviewComponent
          },
          {
            path:'addtask/:taskid',component:TasksformComponent
          },
          {
            path:'category/:categoryid/:duedate',component:TasksComponent
          },
          {
            path:'category/:categoryid/:duedate/addtask',component:TasksformComponent
          },
          {
            path:'category/:categoryid/:duedate/addtask/:taskid',component:TasksformComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate',component:TasksComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate/addtask',component:TasksformComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate/addtask/:taskid',component:TasksformComponent
          },
          {
            path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate',component:TasksComponent
          },
          {
            path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate/addtask',component:TasksformComponent
          },
          {
            path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate/addtask/:taskid',component:TasksformComponent
          },
        ]
      },
      {
        path:'officetasks',
        children:[
          // {
          //   path:'',component:OfficetasksComponent
          // },
          // {
          //   path:'addtask',component:OfficetaskformComponent
          // },
          // {
          //   path:'addtask/:officetaskid',component:OfficetaskformComponent
          // }
        ]
      },
      {
        path:'hometasks',
        children:[
          // {
          //   path:'',component:HometasksComponent
          // }
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
