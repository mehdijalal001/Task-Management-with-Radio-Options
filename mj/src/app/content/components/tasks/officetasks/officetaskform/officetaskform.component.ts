import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//-----------date formater----------------------//
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
//---------dialog------------------/
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as _moment from 'moment';
import { DialogService } from '../../../../../shared/services/dialog.service';
import { OfficetasksService } from '../../../../services/officetasks.service';
import { IOfficeTasks } from '../../../../models/tasks.model';



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
  selector: 'app-officetaskform',
  templateUrl: './officetaskform.component.html',
  styleUrls: ['./officetaskform.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DialogService
  ]
})
export class OfficetaskformComponent implements OnInit {
  taskForm: FormGroup;
  id = 0;
  data;
  //status;
  //statusName;
  //lookuptablename;
  editorStyle = {
    height: '200px'
  };
  sDate:Date;
  mDate:Date;

  startDate = new FormControl(_moment());

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private taskService:OfficetasksService
    ) { }

    
  ngOnInit(): void {

    this.sDate = new Date();
    this.taskForm = this._formBuilder.group({
      OfficeTaskID: [0, null],
      TaskName: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Description: ['', null],
      Duration: ['',null]
    });

    this.taskForm.valueChanges.subscribe(res=>{
      this.mDate = new Date(res.StartDate);
    });
    //----------for edit-----------------//
    this._activatedRoute.paramMap.subscribe(params => {
      //---in the route we created edit route we set id as param so we get it here---//
      const OfficeTaskID = +params.get('officetaskid');
      console.log('---------here-------');
      //console.log(OfficeTaskId);
      if (OfficeTaskID) {
        this.id = OfficeTaskID;
        this.getTaskById(OfficeTaskID);
      }
    });
  }

  getTaskById(id) {
    this.taskService.getTaskById(id,'/officetasks/').subscribe(
      (thetask: IOfficeTasks) => this.editTask(thetask),
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
  editTask(thetask: IOfficeTasks) {
    this.taskForm.patchValue({
      OfficeTaskID: thetask[0].OfficeTaskID,
      TaskName: thetask[0].TaskName,
      StartDate: thetask[0].StartDate,
      EndDate: thetask[0].EndDate,
      Description: thetask[0].Description,
      Duration: thetask[0].Duration
    });
  }

  callNext(time) {
    setTimeout(() => {
      this._activatedRoute.paramMap.subscribe(params => {
        const OfficeTaskID = +params.get('officetaskid');
        if (OfficeTaskID) {
          this.id = OfficeTaskID;
          this.getTaskById(OfficeTaskID);
        }
      });
    }, time);
  }

  taskAction(){
    console.log('----action ----');
    const result = this.taskForm.value;
    console.log(result);
    if(result.OfficeTaskID>0){
      console.log('-----Update task-----');
      this.taskService.updateTask(result, result.OfficeTaskID, '/officetasks/update/').subscribe(
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
      this.taskService.insertTask(result, '/officetasks/insert').subscribe(
        res => {
          if (res) {
            console.log(res);
            this.dialogService.MessageBox('Record inserted successfully', 'X', 3000, 'SuccessMessage');
            this.dialogService.callRedirect('../tasks/officetasks/addtask/' + res, 4000);
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

}
