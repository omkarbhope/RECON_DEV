import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommonSetupService {

  private baseUrl = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  getCountryData() {
    return this.http.get(this.baseUrl.concat('country/'));
  }

  getUserFormData() {
    return this.http.get(this.baseUrl.concat('employee/'));
  }

  getRoleData() {
    return this.http.get(this.baseUrl.concat('role/'));
  }

  getStateData(country_id) {
    return this.http.get(this.baseUrl.concat('state/'));
  }

  getCityData() {
    return this.http.get(this.baseUrl.concat('city/'));
  }

  getLocationData() {
    return this.http.get(this.baseUrl.concat('location/'));
  }

  getUomData() {
    return this.http.get(this.baseUrl.concat('uom/'));
  }

  getTermData() {
    return this.http.get(this.baseUrl.concat('term/'));
  }

  saveUomData(value) {
  if(value.ID){
        return this.http.put(this.baseUrl.concat('uom/'+value.ID+'/'), value);
    }
    return this.http.post(this.baseUrl.concat('uom/'), value);
  }

  saveLocationData(form) {
    form.application_id = 'RHYTHMFLOWS';
    form.sub_application_id = 'RHYTHMFLOWS';
    
    if(form.id)
    {
      return this.http.put(this.baseUrl.concat('location/'+form.id+'/'), form).pipe(map(data => {
        data['status'] = 1;
        return data;
      })
      );
    }
    else
    {
      return this.http.post(this.baseUrl.concat('location/'), form).pipe(map(data => {
        data['status'] = 2;
        return data;
      })
      );
    }
  
  }

  saveUserFormData(form) {
    if(form.id)
    {
      return this.http.put(this.baseUrl.concat('employee/'+form.id+'/'), form).pipe(map(data => {
        data['status'] = 1;
        return data;
      })
      );
    }
    else
    {
      return this.http.post(this.baseUrl.concat('employee/'), form).pipe(map(data => {
        data['status'] = 2;
        return data;
      })
      );
    }
  }

  deleteLocationData(id) {
    console.log("In Service deleteLocationData");
    console.log(id);
    return this.http.delete(this.baseUrl.concat('location/'+id+'/'), id);
      // .pipe(map(data => {
      //   data['status'] = 1;
      //   return data;
      // }));
  }

  deleteUserFormData(id) {
    console.log("In Service deleteLocationData");
    console.log(id);
    return this.http.delete(this.baseUrl.concat('employee/'+id+'/'), id);
      // .pipe(map(data => {
      //   data['status'] = 1;
      //   return data;
      // }));
  }

  saveTermData(value: any) {
    if (value.ID) {
      value.updated_by = value.USERID;
      return this.http.put(
        this.baseUrl.concat('term/' + value.ID + '/'),
        value
      ).pipe(map(data => {
        data['status'] = 2;
        return data;
      }))
    }
    value.created_by = value.USERID;
    return this.http.post(
      this.baseUrl.concat('term/'),
      value
    ).pipe(map(data => {
      data['status'] = 1;
      return data;
    }))
  }

  deleteTermData(value: any) {
    return this.http.put(this.baseUrl.concat('term/' + value.ID + '/'),
      value
    ).pipe(map(data => {
      data['status'] = 1;
      return data;
    }));
  }

  deleteUomData(ID) {
    return this.http.delete(this.baseUrl.concat(`uom/${ID}/`));
  }
}
