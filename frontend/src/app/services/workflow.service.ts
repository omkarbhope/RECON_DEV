import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { GlobalConstants } from '../global/global-constants';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private baseUrl = GlobalConstants.baseUrl;


  constructor(private http: HttpClient) { }

  getActivityData() {
    return this.http.get(this.baseUrl.concat('activity/'));
  }

  getCompanyData() {
    return this.http.get(this.baseUrl.concat('company/'));
  }

  getMasterData() {
    return this.http.get(this.baseUrl.concat('master/'));
  }

  getActionData() {
    return this.http.get(this.baseUrl.concat('action/'));
  }

  getLevelData() {
    return this.http.get(this.baseUrl.concat('level/'));
  }
  getRoleData() {
    return this.http.get(this.baseUrl.concat('role/'));
  }
  getEmployeeData() {
    return this.http.get(this.baseUrl.concat('employee/'));
  }
  getCurrencyData() {
    return this.http.get(this.baseUrl.concat('currency/'));
  }
  getWorkflowData() {
    return this.http.get(this.baseUrl.concat('workflow/'));
  }
  getScreenData() {
    return this.http.get(this.baseUrl.concat('screen-link/'));
  }
  getAllLevelData(level_id){
    return this.http.get(this.baseUrl.concat(`level/${level_id}/`));
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

  saveLevelData(form) {
    if(form.id)
    {
      for (var i = 0; i < form.initialItemRow.length; i++) {
        if (form.initialItemRow[i].id == '') {
          delete form.initialItemRow[i].id;
        }
      }
      return this.http.put(this.baseUrl.concat('level/'+form.id+'/'), form).pipe(map(data => {
        data['status'] = 1;
        return data;
      })
      );
    }
    else
    {
      delete form['id']
      let initialItemRow = form.initialItemRow.filter(function (props) {
        delete props.id;
        return true;
      });
      return this.http.post(this.baseUrl.concat('level/'), form).pipe(map(data => {
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

  deleteLevelData(id) {
    console.log("In Service deleteLocationData");
    console.log(id);
    return this.http.delete(this.baseUrl.concat('activity/'+id+'/'), id);
      // .pipe(map(data => {
      //   data['status'] = 1;
      //   return data;
      // }));
  }

}
