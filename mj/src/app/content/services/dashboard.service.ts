import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
//import { Observable, throwError } from 'rxjs';
//import { catchError, tap, map } from 'rxjs/operators';
// import { IAnnouncement } from "../models/announcement.model";
import { BuildEnvironment } from '../../../environments/environment';
// import { error } from 'protractor';
// import 'rxjs/add/operator/catch';
 //import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseurl: string;

  constructor(private http: HttpClient) {
    const rootURL = BuildEnvironment.GetEnvironmentUrl();
    this.baseurl = rootURL;
  }

  getMyTasksDueToday(urn: string) {
    return this.http.get(this.baseurl + urn);
  }
  getMyTasksDueTomorrow(urn: string) {
    return this.http.get(this.baseurl + urn);
  }
  getMyTasksDueNext7Days(urn: string) {
    return this.http.get(this.baseurl + urn);
  }
  getTaskById(id: number, urn: string){
    try {
      return this.http.get(this.baseurl + urn + id);
    } catch (err) {
      console.log('---------Unexpected error occured-------');
    }
  }
}
