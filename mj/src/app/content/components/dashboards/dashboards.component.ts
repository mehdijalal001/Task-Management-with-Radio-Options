import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
  
})

export class DashboardsComponent {

  bgHome;
  bgOffice;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.bgHome = 65;
    this.bgOffice = 12;
  }
}
