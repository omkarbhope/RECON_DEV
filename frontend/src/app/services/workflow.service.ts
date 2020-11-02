import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private baseUrl = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  getActivityData() {
    return this.http.get(this.baseUrl.concat('activity/'));
  }

  saveActivityData(form) {
    if(form.id)
    {
      return this.http.put(this.baseUrl.concat('activity/'+form.id+'/'), form).pipe(map(data => {
        data['status'] = 1;
        return data;
      })
      );
    }
    else
    {
      return this.http.post(this.baseUrl.concat('activity/'), form).pipe(map(data => {
        data['status'] = 2;
        return data;
      })
      );
    }
  }

  deleteActivityData(id) {
    console.log("In Service deleteLocationData");
    console.log(id);
    return this.http.delete(this.baseUrl.concat('activity/'+id+'/'), id);
      // .pipe(map(data => {
      //   data['status'] = 1;
      //   return data;
      // }));
  }

}
