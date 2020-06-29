import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { DialogService } from './../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ITasks } from './../../models/tasks.model';
import { DashboardService } from './../../services/dashboard.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
  
})

export class DashboardsComponent implements OnInit {

  _myTasksDueToday;
  _myTasksDueTomorrow;
  currentDate:any;
  tomorrow:any;
  all = 'all';
  bgHome;
  bgOffice;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardservices:DashboardService,  
    public dialog: MatDialog,
    private dialogService: DialogService) {}

  ngOnInit(): void {
    this.getMyTasksDueToday();
    this.getMyTasksDueTomorrow();
  }
  getMyTasksDueToday(){
    this.dashboardservices.getMyTasksDueToday('/tasks/mytasksduetoday').subscribe(
      (modelData: ITasks[]) => {
        //console.log(modelData);
        this._myTasksDueToday = modelData;
        this.currentDate = new Date().toISOString();
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
  getMyTasksDueTomorrow(){
    this.dashboardservices.getMyTasksDueTomorrow('/tasks/mytasksduetomorrow').subscribe(
      (modelData: ITasks[]) => {
        console.log(modelData);
        this._myTasksDueTomorrow = modelData;
        this.tomorrow = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate()+1);
        this.tomorrow = this.tomorrow.toISOString();
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
  getMyTasksDueNext7Days(){
    this.dashboardservices.getMyTasksDueNext7Days('/tasks/myTasksDueNext7Days').subscribe(
      (modelData: ITasks[]) => {
        console.log(modelData);
        this._myTasksDueTomorrow = modelData;
        //this.tomorrow = new Date().toISOString();
        this.tomorrow = new Date();
        let tomorrow2 = this.tomorrow.setDate(this.tomorrow.getDate()+1);
        this.tomorrow = this.tomorrow.toISOString();
        //console.log('-----------xxxxx-----');
 
        //console.log(tomorrow2);
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

}
