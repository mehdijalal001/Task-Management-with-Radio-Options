import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { DialogService } from './../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ITasks } from './../../models/tasks.model';
import { DashboardService } from './../../services/dashboard.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
  
})

export class DashboardsComponent implements OnInit {


  _myTasksDueToday;
  _myTasksDueTomorrow;
  _myTasksDueNext7days;
  currentDate:any;
  tomorrow:any;
  next7days:any;
  all = 'all';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardservices:DashboardService,  
    public dialog: MatDialog,
    private dialogService: DialogService) {}

  ngOnInit(): void {
    this.currentDate = formatDate(new Date(),'yyyy-MM-dd','en_US');
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate()+1);
    this.tomorrow = formatDate(this.tomorrow, 'yyyy-MM-dd','en_US');

    let todaysdate = new Date();
    todaysdate.setDate(todaysdate.getDate()+7);
    this.next7days = formatDate(todaysdate, 'yyyy-MM-dd','en_US');
    //console.log(this.next7days);
    this.getMyTasksDueToday('/tasks/groupedtasksbyduedate/',this.currentDate);
    this.getMyTasksDueTomorrow('/tasks/groupedtasksbyduedate/',this.tomorrow);
    this.getMyTasksDueNext7Days('/tasks/groupedtasksbetweendates/',this.currentDate,this.next7days);
  }
  getMyTasksDueToday(url,duedate){
    console.log(this.currentDate);
    this.dashboardservices.getGroupedTasksByDueDate(url,duedate).subscribe(
      (modelData: ITasks[]) => {
        //console.log(modelData);
        this._myTasksDueToday = modelData;
   
        
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            //this.callNext(200);
          }
        });
      }
    );
  }
  getMyTasksDueTomorrow(url,duedate){
    this.dashboardservices.getGroupedTasksByDueDate(url,duedate).subscribe(
      (modelData: ITasks[]) => {
        console.log(modelData);
        this._myTasksDueTomorrow = modelData;
       
        //this.tomorrow = this.tomorrow.toISOString();
        
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            //this.callNext(200);
          }
        });
      }
    );
  }
  getMyTasksDueNext7Days(url,startdate,enddate){
    this.dashboardservices.getGroupedTasksBetweenDates(url,startdate,enddate).subscribe(
      (modelData: ITasks[]) => {
        console.log(modelData);
        this._myTasksDueNext7days = modelData;
      
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            //this.callNext(200);
          }
        });
      }
    );
  }

  setTimeZone(date) {
    date.setHours(date.getHours() + (new Date().getTimezoneOffset() / 60));
    return date;
}

}
