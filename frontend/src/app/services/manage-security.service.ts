import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ManageSecurityService {

  private baseUrl = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  getLeftPanelData() {
    return this.http.get(this.baseUrl.concat('left-panel/'));
  }

  saveLeftPanelData(form) {
    if(form.id)
    {
      return this.http.put(this.baseUrl.concat('left-panel/'+form.id+'/'), form).pipe(map(data => {
        data['status'] = 1;
        return data;
      })
      );
    }
    else
    {
      return this.http.post(this.baseUrl.concat('left-panel/'), form).pipe(map(data => {
        data['status'] = 2;
        return data;
      })
      );
    }
  }

  deleteLeftPanelData(id) {
    console.log("In Service deleteLocationData");
    console.log(id);
    return this.http.delete(this.baseUrl.concat('left-panel/'+id+'/'), id);
      // .pipe(map(data => {
      //   data['status'] = 1;
      //   return data;
      // }));
  }
}
