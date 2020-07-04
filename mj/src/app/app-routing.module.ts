import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { UsersComponent } from './content/components/admin/users/users.component';
import { DashboardsComponent } from './content/components/dashboards/dashboards.component';


const routes: Routes = [
  {
    path:'',component:DefaultComponent
  },
  {
    path:'dashboard',component:DashboardsComponent
  },
  {
    path:'users',component:UsersComponent
  },
  {
    path:'tasks',
    loadChildren:()=>import('./content/content.module').then(m=>m.ContentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
