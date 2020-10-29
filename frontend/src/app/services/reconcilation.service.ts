import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReconcilationService {


  constructor(private http: HttpClient) { }

  APIUrl = "http://127.0.0.1:8000";

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getCompanyData() {
    return this.http.get<any[]>(`${this.APIUrl}/company`);
  }

  getCityData() {
    return this.http.get<any[]>(`${this.APIUrl}/city`);
  }

  getCountryData() {
    return this.http.get<any[]>(`${this.APIUrl}/country`);
  }

  getRoleData() {
    return this.http.get<any[]>(`${this.APIUrl}/role`);
  }

  getStateData() {
    return this.http.get<any[]>(`${this.APIUrl}/state`);
  }

  getReconTypeData() {
    return this.http.get<any[]>(`${this.APIUrl}/master`);
  }

  getSourceMaster() {
    return this.http.get<any[]>(`${this.APIUrl}/srcmaster`);
  }

  getSourceDetails(id) {
    return this.http.get<any[]>(`${this.APIUrl}/srcdetails/` + id);
  }


  getReconcilationMaster() {
    return this.http.get<any[]>(`${this.APIUrl}/reconmst`);
  }


  addReconcilationData(data) {
    console.log(data, 'values from service');
    return this.http.post<any[]>(`${this.APIUrl}/reconmst/`, data).pipe(catchError(this.handleError));
  }

  updateReconcilationData() {

  }

  deleteReconcilationData() {

  }

}
