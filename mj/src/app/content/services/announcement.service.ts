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
export class AnnouncementService {

  private baseurl: string;

  constructor(private http: HttpClient) {
    const rootURL = BuildEnvironment.GetEnvironmentUrl();
    this.baseurl = rootURL;
  }

  getAllPublished(urn: string) {
    return this.http.get(this.baseurl + urn);
  }
  getAll(urn: string) {
    return this.http.get(this.baseurl + urn);
  }

  getById(id: number, urn: string){
    try {
      return this.http.get(this.baseurl + urn + id);
    } catch (err) {
      console.log('---------Unexpected error occured-------');
    }
  }
  // getById(id: number,urn:string): Observable<IAnnouncement> {
  //   try{
  //     return this.http.get<IAnnouncement>(this.baseurl + urn + id);
  //   }catch(err){
  //     console.log('---------Unexpected error occured-------');
  //   }
  // }

  insertRecord(formdata: any, urn: string) {
    try {
      return this.http.post(this.baseurl + urn, formdata);
    } catch (err) {
      console.log('-------Error occurred posting----' + err);
    }
  }
  updateData(formdata: any, id: number, urn: string) {
    try {
      return this.http.post(this.baseurl + urn + id, formdata);
      //.subscribe(result => console.log(result));
    } catch (err) {
      //this.handleError(err);
      console.log(err);
    }
  }
  archiveRecord(formdata: any, id: number, urn: string) {
    try {
      return this.http.post(this.baseurl + urn + id, formdata);
      //.subscribe(result => console.log(result));
    } catch (err) {
      //this.handleError(err);
      console.log(err);
    }
  }
  deleteRecord(id, urn: string) {
    return this.http.delete(this.baseurl + urn + id, {
      headers: {},
      params: { announcementid: id }
    });
  }

  // private handleError(err: HttpErrorResponse) {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}
