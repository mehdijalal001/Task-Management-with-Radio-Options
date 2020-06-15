import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
//---------dialog------------------/
import { MatDialog } from '@angular/material/dialog';

//---------service--------//
import { AnnouncementService } from '../../services/announcement.service';
import { IAnnouncement } from '../../models/announcement.model';
import { Router } from '@angular/router';
//import { AnnouncementListData, AnnouncementlistpopComponent } from '../announcements/announcementlistpop/announcementlistpop.component';
//import { AnnouncementData, AnnouncementpreboxComponent } from '../announcements/announcementprebox/announcementprebox.component';
import { DialogService } from '../../services/dialog.service';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['../../shared/css/liststyle.scss','./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  ELEMENT_DATA;

  Announcement;
  AnnouncementList: IAnnouncement[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'Preview',
    'Name',
    'EmployeeName',
    'Position',
    'Office',
    'Age',
    'StartDate',
    'delete'
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private service: AnnouncementService,
    public dialog: MatDialog,
    //private _snackBar: MatSnackBar,
    private dialogService: DialogService,
    private router: Router
  ) {}
  ngOnInit() {
    this.refreshData();
    //this.paginator.pageSize = 10;
  }

  refreshData() {
    console.log('-----------got here--------');
    this.service.getAll('/announcements/allannouncement').subscribe(
      (modelData: IAnnouncement[]) => {
        console.log(modelData);
        this.AnnouncementList = modelData;
        this.ELEMENT_DATA = modelData;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRecords(id) {
    if (id > 0) {
      this.service.deleteRecord(id, '/announcements/').subscribe(
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

 

  //--------------dialog-------//
  deleteRecord(id): void {
    const result = this.dialogService.openDialog(id, 'Confirm Action', 'Are you sure you want to delete?', 'Cancel', 'Delete Now');
    result.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteRecords(id);
      }
    });
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

  // openPreview(id): void {
  //   const res = new AnnouncementData('{data}', id, 'open', 'X', 'view');
  //   const req = this.dialog.open(AnnouncementpreboxComponent, { data: res, panelClass: 'seneca-preview-modal' });
  //   req.afterClosed().subscribe(dataBox => {
  //     if (dataBox) {
  //       const data = dataBox;
  //     }
  //   });
  // }

  // PreviewList(listdata) {
  //   const res = new AnnouncementListData('{data}', listdata, 'open', 'X');
  //   const req = this.dialog.open(AnnouncementlistpopComponent, {
  //     data: res,
  //     panelClass: 'seneca-preview-modal'
  //   });

  //   req.afterClosed().subscribe(dataBox => {
  //     if (dataBox) {
  //     }
  //   });
  // }
}
