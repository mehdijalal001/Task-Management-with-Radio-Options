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
  currentDate:any;

  bgHome;
  bgOffice;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardservices:DashboardService,  
    public dialog: MatDialog,
    private dialogService: DialogService) {}

  ngOnInit(): void {
    this.getMyTasksDueToday();
  }
  getMyTasksDueToday(){
    this.dashboardservices.getMyTasksDueToday('/tasks/mytasksduetoday').subscribe(
      (modelData: ITasks[]) => {
        console.log(modelData);
        this._myTasksDueToday = modelData;
        this.currentDate = new Date().toISOString();
        console.log('-----');
        console.log(this.currentDate);
        console.log('--ssss----');
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
