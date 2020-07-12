import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { DialogService } from './../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ITasks } from './../../models/tasks.model';
import { DashboardService } from './../../services/dashboard.service';
import { formatDate } from '@angular/common';
import { Router,ActivatedRoute} from '@angular/router';
import * as _moment from 'moment-timezone';

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
  lastdays:any;
  nextdays:any;
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
  _totalcompleted=0;
  _totalpending=0;
  _totaloverdue=0;
   // Pie
   public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = ['Overdue', 'Completed', 'Pending'];
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
    private router: Router,
    private _activatedRoute: ActivatedRoute,  
    public dialog: MatDialog,
    private dialogService: DialogService) {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    }

  ngOnInit(): void {
    
    this.currentDate = _moment().format('YYYY-MM-DD');
    this.tomorrow = _moment().add(1,'d').format('YYYY-MM-DD');


     //-----Next 7 days--------//
    this.next7days = _moment().add(7,'d').format('YYYY-MM-DD');
    //console.log(this.next7days);

    //------Last  days----------//
    this.lastdays = _moment().add(-15,'d').format('YYYY-MM-DD');
    //------Next days--------//
    this.nextdays = _moment().add(15,'d').format('YYYY-MM-DD');

    this.getMyTasksDueToday('/tasks/groupedtasksbyduedate/',this.currentDate);
    this.getMyTasksDueTomorrow('/tasks/groupedtasksbyduedate/',this.tomorrow);
    this.getMyTasksDueNext7Days('/tasks/groupedpendingtasksbetweendates/',this.currentDate,this.next7days);
    this.getAllMyTasksBetweenDates('/tasks/getallmytasksbetweendates/',this.lastdays,this.nextdays);
  
  }

  getMyTasksDueToday(url,duedate){
    //console.log(this.currentDate);
    this.dashboardservices.getGroupedTasksByDueDate(url,duedate).subscribe(
      (modelData: ITasks[]) => {
        console.log(modelData);
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
        //console.log(modelData);
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
        //console.log(modelData);
        this._myTasksDueNext7days = modelData;

        let arr1 = [];
        let arr2 = [];
        let i = 0;
        modelData.forEach((item)=>{
          //console.log(item);
          //console.log(item.totaltasks);
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

  getAllMyTasksBetweenDates(url,startdate,enddate){
    this.dashboardservices.getAllMyTasksBetweenDates(url,startdate,enddate).subscribe(
      (modelData: ITasks[]) => {
        //console.log(modelData);

        let TodayDate = _moment().format('YYYY-MM-DD');
 
        //let CompletedArr = [];
        //let NotCompletedArr = [];
        //let PendingArr = [];
        let icompleted = 0;
        let ioverdue = 0;
        let ipending =0;
        modelData.forEach((item)=>{
          if(item.Status==true){
            //CompletedArr.push(item);
            icompleted++;
          }else{
   
           
            let _enddate = item.EndDate;
            let newEndDate = _moment(_enddate.slice(0,-14)).format('YYYY-MM-DD');
            console.log(newEndDate);
            if(newEndDate<TodayDate){
              //NotCompletedArr.push(item);
              ioverdue++;
            }else{
              //PendingArr.push(item);
              ipending++;
            }
          }
        });

        this.pieChartData = [ioverdue, icompleted, ipending];

        //console.log(CompletedArr);
        //console.log(NotCompletedArr);
        //console.log(PendingArr);
       
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

  chartHovered(e){
    //console.log(e);
    //console.log('=========Chart hovered============');
  }
  
  chartClicked(e,startdate,enddate){
   // console.log(e);

    console.log('=========Chart clicked============');
    //console.log(e.active[0]._view.label);
    let statusType = e.active[0]._view.label;
    console.log(startdate);
    console.log(enddate);
    console.log(statusType);

    this.router.navigate(['./tasks/alltasks/status/',statusType,startdate,enddate]);
  }

}
