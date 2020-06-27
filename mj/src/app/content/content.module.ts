import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';

import { FlexLayoutModule } from '@angular/flex-layout';



import {MatTooltipModule} from '@angular/material/tooltip';
import { QuillModule } from 'ngx-quill';
import { ReplacePipe } from './shared/pipes/replace-pipes';


import { OfficetasksComponent } from './components/tasks/officetasks/officetasks.component';
import { HometasksComponent } from './components/tasks/hometasks/hometasks.component';
import { OfficetaskformComponent } from './components/tasks/officetasks/officetaskform/officetaskform.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksformComponent } from './components/tasks/tasksform/tasksform.component';
import {DashboardsComponent} from './components/dashboards/dashboards.component';
import { TaskscategoryviewComponent } from './components/tasks/taskscategoryview/taskscategoryview.component';
import { TaskscategoryviewformComponent } from './components/tasks/taskscategoryview/taskscategoryviewform/taskscategoryviewform.component';



@NgModule({
  declarations: [
    AdminComponent, 
    UsersComponent, 
    AnnouncementsComponent, 
    OfficetasksComponent, 
    HometasksComponent, 
    OfficetaskformComponent,
    ReplacePipe,
    DashboardsComponent,
    TasksComponent,
    TasksformComponent,
    TaskscategoryviewComponent,
    TaskscategoryviewformComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatBadgeModule,
    QuillModule.forRoot(),
    FlexLayoutModule

  ],
  exports:[
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ContentModule { }
