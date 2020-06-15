import {Component, OnInit, ViewChild} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import {MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';


import { OfficetasksService } from '../../../services/officetasks.service';
import { DialogService } from '../../../services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { IOfficeTasks } from '../../../models/tasks.model';




@Component({
  selector: 'app-officetasks',
  templateUrl: './officetasks.component.html',
  styleUrls: ['./officetasks.component.scss']
})
export class OfficetasksComponent implements OnInit {

  theTasks;
  tasksList: IOfficeTasks[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ELEMENT_DATA:any[] = [];

  displayedColumns: string[] = [
    'select',
    'taskid',
    'taskname', 
    'duration', 
    'startdate',
    'enddate',
    'percentage',
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

  constructor(private taskservice:OfficetasksService,  
    public dialog: MatDialog,
    private dialogService: DialogService,private router: Router) {}

  ngOnInit(): void {
    this.refreshData();
  }
  refreshData() {
    console.log('-----------got here--------');
    this.taskservice.getAllTasks('/officetasks/').subscribe(
      (modelData: IOfficeTasks[]) => {
        console.log(modelData);
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

  callNext(timeout) {
    setTimeout(() => {
      this.refreshData();
    }, timeout);
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

    deleteTask(taksId){
      console.log(taksId);
    }

}
