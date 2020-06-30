import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { DialogService } from './../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ITasks } from './../../models/tasks.model';
import { DashboardService } from './../../services/dashboard.service';
import { formatDate } from '@angular/common';

//---for charts------------------//
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

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
 //---today----//
  _myTasksDueToday_part1;
  _myTasksDueToday_part2;
  _totalTasksDueToday=0;

  //---tomorrow----//
  _myTasksDueTomorrow_part1;
  _myTasksDueTomorrow_part2;
  _totalTasksDueTomorrow=0;
  //---next 7 days----//
  _myTasksDueNext7days_part1;
  _myTasksDueNext7days_part2;
  _totalTasksDueNext7days=0;
  //----------for charts start here-----------------//
   // Pie
   public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [['Not', 'Completed'], ['Completed'], 'Pending'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#eb9292', '#b3f1b3', '#fdf57d'],
    borderColor: ['rgba(252, 235, 89, 0.2)', 'rgba(77, 152, 202, 0.2)', 'rgba(241, 107, 119, 0.2)']
 }];

  //---------charts ends here----------------------//
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardservices:DashboardService,  
    public dialog: MatDialog,
    private dialogService: DialogService) {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    }

  ngOnInit(): void {
    this.pieChartData = [300, 500, 100]
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
    this.getMyTasksAllLastAndNext7Days('/tasks/groupedtasksbetweendates/',this.currentDate,this.next7days);
  }
  chartClicked(e){
    console.log(e);
    console.log('=========Chart clicked============');
  }
  chartHovered(e){
    console.log(e);
    console.log('=========Chart hovered============');
  }
  getMyTasksDueToday(url,duedate){
    console.log(this.currentDate);
    this.dashboardservices.getGroupedTasksByDueDate(url,duedate).subscribe(
      (modelData: ITasks[]) => {
        //console.log(modelData);
        this._myTasksDueToday = modelData;
        let arr1 = [];
        let arr2 = [];
        let i = 1;
        modelData.forEach((item)=>{
          //console.log(item);
          this._totalTasksDueToday += item.totaltasks;
          //console.log(item.totaltasks);
          if(i<=6){
            arr1.push(item);
          }else{
            arr2.push(item);
          }
          i++;
        });
        this._myTasksDueToday_part1 = arr1;
        this._myTasksDueToday_part2 = arr2;
        //this._myTasksDueToday_part3 = arr3;

        
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
       
        let arr1 = [];
        let arr2 = [];
        let i = 1;
        modelData.forEach((item)=>{
          //console.log(item);
          this._totalTasksDueTomorrow += item.totaltasks;
          //console.log(item.totaltasks);
          if(i<=6){
            arr1.push(item);
          }else{
            arr2.push(item);
          }
          i++;
        });
        this._myTasksDueTomorrow_part1 = arr1;
        this._myTasksDueTomorrow_part2 = arr2;
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

        let arr1 = [];
        let arr2 = [];
        let i = 1;
        modelData.forEach((item)=>{
          //console.log(item);
          this._totalTasksDueNext7days += item.totaltasks;
          //console.log(item.totaltasks);
          if(i<=6){
            arr1.push(item);
          }else{
            arr2.push(item);
          }
          i++;
        });
        this._myTasksDueNext7days_part1 = arr1;
        this._myTasksDueNext7days_part2 = arr2;
      
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
  //----get all last and next 7 days-----//
  getMyTasksAllLastAndNext7Days(url,startdate,enddate){
    this.dashboardservices.getGroupedTasksBetweenDates(url,startdate,enddate).subscribe(
      (modelData: ITasks[]) => {
        console.log(modelData);

      
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
