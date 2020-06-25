import {Component, OnInit, ViewChild} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import {MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';



import { DialogService } from './../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ITasks } from './../../models/tasks.model';
import { TasksService } from './../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tableResponsiveColumns=false;
  theTasks;
  tasksList: ITasks[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ELEMENT_DATA:any[] = [];

  displayedColumns: string[] = [
    'select',
    'taskname',
    'category',
    'startdate',
    'enddate',
    'status',
    'actions'
    ];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
    

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       // { title: 'Card 2', cols: 1, rows: 1 },
  //       // { title: 'Card 3', cols: 1, rows: 2 },
  //       // { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );


  //screenWidth2;
  constructor(private taskservice:TasksService,  
    public dialog: MatDialog,
    private dialogService: DialogService,private router: Router,private breakpointObserver: BreakpointObserver) {

      // this.screenWidth2 = window.innerWidth;
      // window.onresize = ()=>{
      //   this.screenWidth2 = window.innerWidth;
      //   if(this.screenWidth2<=599){
      //     this.tableResponsiveColumns=true;
      //   }else{
      //     this.tableResponsiveColumns=false;
      //   }
      // }
      
    }

  ngOnInit(): void {
    this.refreshData();
  }
  refreshData() {
    console.log('-----------got here--------');
    this.taskservice.getAllTasks('/tasks/').subscribe(
      (modelData: ITasks[]) => {
        //console.log(modelData);
        this.tasksList = modelData;
        this.ELEMENT_DATA = modelData;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.selection = new SelectionModel<any>(true, []);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(200);
          }
        });
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  /*----Work to be done as planned-----*/
  callRedirect(route, time) {
    setTimeout(() => {
      this.router.navigate([route]);
    }, time);
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
     
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    deleteTask(TaskID){
      console.log(TaskID);
      const result = this.dialogService.openDialog(TaskID, 'Confirm Action', 'Are you sure you want to delete?', 'Cancel', 'Delete Now');
      result.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.deleteTaskById(TaskID);
        }
      });
    }

    deleteTaskById(TaskID){
      if(TaskID>0){
        this.taskservice.deleteTaskById(TaskID, '/tasks/').subscribe(
          res => {
            if (res) {
              this.dialogService.MessageBox('Deleted', 'X', 4000, 'SuccessMessage');
              this.callNext(1);
            } else {
              this.dialogService.MessageBox('Error Deleting', 'X', 5000, 'ErrorMessage');
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
    //------Next call--------//
 
    callNext(timeout) {
      setTimeout(() => {
        this.refreshData();
      }, timeout);
    }

    updateStatus(TaskID:any,event:any){
      console.log(TaskID);
      console.log(event.checked);
      let status = event.checked;

      if(TaskID>0){
        console.log('-----Update task-----');
        const result = {"TaskID":TaskID,"Status":status};
        this.taskservice.updateStatus(result, TaskID, '/tasks/updatestatus/').subscribe(
          res => {
            if (res) {
              this.dialogService.MessageBox('Updated', 'X', 100, 'SuccessMessage');
              this.callNext(1000);
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
      }
    }
  
    deleteAllSelectedTasks(){
      console.log('-----deleting all selection---');
      let sel = this.selection.selected;
      const result = this.dialogService.openDialog(sel, 'Confirm Action', 'Are you sure you want to delete?', 'Cancel', 'Delete Now');
      result.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.deleteAll(sel);
        }
      });
    }
    deleteAll(list){
      let lng = list.length;
   
      if (lng > 0) {
        this.taskservice.deleteAll(list,'/tasks/deleteall').subscribe(
          res => {
            if (res) {
              this.dialogService.MessageBox('Deleted', 'X', 4000, 'SuccessMessage');
              this.callNext(1);
            } else {
              this.dialogService.MessageBox('Error Deleting', 'X', 5000, 'ErrorMessage');
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
