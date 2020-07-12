import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//-----------date formater----------------------//
import { MomentDateAdapter,MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS  } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
//---------dialog------------------/
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
//import * as _moment from 'moment';
import * as _moment from 'moment-timezone';
import { DialogService } from './../../../../shared/services/dialog.service';
import { TasksService } from './../../../services/tasks.service';
import { ITasks } from './../../../models/tasks.model';
import {ICategory} from '../../../../shared/models/lookup.model';
import { LookupsService } from '../../../../shared/services/lookups.service';
import { toDate } from 'date-fns';
import { formatDate } from '@angular/common';



//const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};
@Component({
  selector: 'app-tasksnewform',
  templateUrl: './tasksnewform.component.html',
  styleUrls: ['./tasksnewform.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      //deps: [MAT_DATE_LOCALE]
    },
    //---Note: below proider will set utc to 2020-07-14T00:00:00.000Z so I used for all this format-----//
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DialogService
  ]
})

export class TasksnewformComponent implements OnInit {

  taskForm: FormGroup;
  id = 0;
  data;
  //status;
  //statusName;
  //lookuptablename;
  editorStyle = {
    'min-height': '100px'
  };
  sDate:Date;
  mDate:Date;
  category;
  schedule;
  isScheduleSelected:boolean=false;
   //-------for display different views-----//
   duedate;
   categoryID:number;
   startdate;
   enddate;
   statusStartdate;
   statusEnddate;
   statusType;

  //startDate = new FormControl(_moment());
  //CategoryID = new FormControl('', [Validators.required]);
  selected;

  constructor(
    private _formBuilder: FormBuilder,
    private _router:Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private lookupService: LookupsService,
    private taskService:TasksService
    ) { }
    
  ngOnInit(): void {
  
    this.sDate = new Date();
    this.taskForm = this._formBuilder.group({
      TaskID: [0, null],
      TaskName: ['', Validators.required],
      Schedule: ['', null],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Description: ['', null],
      Duration: ['',null],
      CategoryID: [0,null]
    });

     this.taskForm.valueChanges.subscribe(res=>{
       this.mDate = new Date(res.StartDate);
     });

    //----------for edit-----------------//
    this._activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.categoryID = Number(params.get('categoryid'));
      //=====For Category start here==============//
      this.duedate = params.get('duedate');
      //=========Startdate and enddate starts here==========//
      this.startdate = params.get('startdate');
      this.enddate = params.get('enddate');
      //---in the route we created edit route we set id as param so we get it here---//
      const TaskID = +params.get('taskid');
      if (TaskID) {
        this.id = TaskID;
        this.getTaskById(TaskID);
      }else if(this.categoryID && this.duedate){
        this.taskForm.patchValue({
          CategoryID:this.categoryID
        });
      }else if(this.categoryID && this.startdate && this.enddate){
        this.taskForm.patchValue({
          CategoryID:this.categoryID
        });
      }else{
        this.taskForm.patchValue({
          CategoryID:1
        });
      }
    });

    let lookupTablename: string;
    console.log('------'+this.categoryID);
    if(this.categoryID==0){
      console.log('---JONNI--------');
      this.selected = 1;
    }else{
      this.selected = this.categoryID;
    }
    this.lookupService.getLookupByTableAlias((lookupTablename = 'category')).subscribe(
      (icategory: any) => {
        this.category = icategory;
        //console.log(icategory);
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(4000);
          }
        });
      }
    );

    this.lookupService.getLookupByTableAlias((lookupTablename = 'schedule')).subscribe(
      (ischedule: any) => {
        this.schedule = ischedule;
        console.log(ischedule);
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(4000);
          }
        });
      }
    );
  }

  radioButtonChanged($event){
    let radioValue = event.target['value'];
    if(radioValue==3){
      this.isScheduleSelected = true;
      this.taskForm.controls['StartDate'].enable();
      this.taskForm.controls['EndDate'].enable();
    }else{
      this.isScheduleSelected = false;
      this.taskForm.controls['StartDate'].disable();
      this.taskForm.controls['EndDate'].disable();
    }
  }
  getTaskById(id) {
    this.taskService.getTaskById(id,'/tasks/').subscribe(
      (thetask: ITasks) => this.editTask(thetask),
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(200);
          }
        });
      }
    );
  }
  editTask(thetask: ITasks) {
    console.log(thetask);
    this.taskForm.patchValue({
      TaskID: thetask[0].TaskID,
      TaskName: thetask[0].TaskName,
      StartDate: thetask[0].StartDate,
      EndDate: thetask[0].EndDate,
      Description: thetask[0].Description,
      Duration: thetask[0].Duration,
      CategoryID: thetask[0].CategoryID
    });
  }

  callNext(time) {
    setTimeout(() => {
      this._activatedRoute.paramMap.subscribe(params => {
        const TaskID = +params.get('taskid');
        if (TaskID) {
          this.id = TaskID;
          this.getTaskById(TaskID);
        }
      });
    }, time);
  }

  taskAction(){
    console.log('----action ----');
    const result = this.taskForm.value;
    let scheduleType = result.Schedule;
    if(scheduleType==1){
      let datenow = _moment().format('YYYY-MM-DD');
      console.log(datenow);
      let _today = {'StartDate':datenow, 'EndDate': datenow}
      Object.assign(result,_today);

    }else if(scheduleType==2){

      let _theTomorrow = _moment().add(1,'d').format('YYYY-MM-DD');
      //console.log(_theTomorrow);
      let _tommorrow = {'StartDate':_theTomorrow, 'EndDate': _theTomorrow}
      Object.assign(result,_tommorrow);
    }
    // }else{
    //   let postedStartDate = _moment(result.StartDate);
    //   let postedEndDate = _moment(result.EndDate);
    //   //console.log(postedStartDate);
    //   //console.log(postedEndDate);
    //   let _newStartandEnddate = {'StartDate':postedStartDate, 'EndDate':postedEndDate}
    //   Object.assign(result,_newStartandEnddate)
    // }
    //console.log(scheduleType);
    console.log(result);
    if(result.TaskID>0){
      console.log('-----Update all task-----');
      this.taskService.updateTask(result, result.TaskID, '/tasks/update/').subscribe(
        res => {
          if (res) {
            this.dialogService.MessageBox('Updated', 'X', 100, 'SuccessMessage');
            this.callNext(5000);
          } else {
            this.dialogService.MessageBox('Error updating record', 'X', 5000, 'ErrorMessage');
          }
        },
        error => {
          const res = this.dialogService.ErrorDialog(
            'Server Error',
            'Sorry, the system is unavailable at the moment.',
            'Close',
            'Try Again'
          );
          res.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
              this.callNext(200);
            }
          });
        }
      );
    }else{
      console.log('---------add task-------');
      this.taskService.insertTask(result, '/tasks/insert').subscribe(
        res => {
          if (res) {
            console.log(res);
            //this.dialogService.callRedirect('../tasks/alltasks', 1);
            this.callNext(3000);
            //this.taskForm.controls['TaskName'].reset();
            this.dialogService.MessageBox('Record inserted successfully', 'X', 6000, 'SuccessMessage');

            //this.dialogService.callRedirect('../tasks/officetasks/addtask/' + res, 4000);
          } else {
            this.dialogService.MessageBox('Error insert record', 'X', 5000, 'ErrorMessage');
          }
        },
        error => {
          const res = this.dialogService.ErrorDialog(
            'Server Error',
            'Sorry, the system is unavailable at the moment.',
            'Close',
            'Try Again'
          );
          res.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
              this.callNext(200);
            }
          });
        }
      );
    }
  }

  saveAndClose(){
    this._activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.categoryID = Number(params.get('categoryid'));
      //=====For Category start here==============//
      this.duedate = params.get('duedate');
      //=========Startdate and enddate starts here==========//
      this.startdate = params.get('startdate');
      this.enddate = params.get('enddate');
      //==========status view===============//
      this.statusType = params.get('statustype');
      this.statusStartdate = params.get('fromstatusstartdate');
      this.statusEnddate = params.get('fromstatusenddate');
      //---in the route we created edit route we set id as param so we get it here---//
      const TaskID = +params.get('taskid');
      if (TaskID) {
        if(this.categoryID && this.duedate){
          this._router.navigate(['./tasks/alltasks/category/'+this.categoryID+'/'+this.duedate]);
        }else if(this.categoryID && this.startdate && this.enddate){
          this._router.navigate(['./tasks/alltasks/categorywithstartend/'+this.categoryID+'/'+this.startdate+'/'+this.enddate]);
        }else if(this.statusType && this.statusStartdate && this.statusEnddate){
          this._router.navigate(['./tasks/alltasks/status/'+this.statusType+'/'+this.statusStartdate+'/'+this.statusEnddate]);
        }else{
          this._router.navigate(['./tasks/alltasks']);

        }
        //this.id = TaskID;
        //this.getTaskById(TaskID);
      }else{
        if(this.categoryID && this.duedate){
          this._router.navigate(['./tasks/alltasks/category/'+this.categoryID+'/'+this.duedate]);
        }else if(this.categoryID && this.startdate && this.enddate){
          this._router.navigate(['./tasks/alltasks/categorywithstartend/'+this.categoryID+'/'+this.startdate+'/'+this.enddate]);
        }else if(this.statusType && this.statusStartdate && this.statusEnddate){
          this._router.navigate(['./tasks/alltasks/status/'+this.statusType+'/'+this.statusStartdate+'/'+this.statusEnddate]);
        }else{
          this._router.navigate(['./tasks/alltasks']);
        }
      } 
    });
  }


}
