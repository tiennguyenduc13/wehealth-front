import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ISetting } from '../../models/setting.model';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private settingUrl = environment.backendUrl + '/setting';

  constructor(private http: HttpClient) {}
  loadSetting(userId: string): Observable<ISetting> {
    return this.http.get<ISetting>(`${this.settingUrl}/${userId}`).pipe(
      map((resData) => {
        console.log('loadSetting result: ', resData);
        return resData;
      })
    );
  }
  updateSetting(userId, setting) {
    console.log('Calling backend updateSetting', userId, setting);
    if (!_.isEmpty(userId) && !_.isEmpty(setting)) {
      return this.http
        .post<ISetting>(`${this.settingUrl}/updateSetting/${userId}`, setting)
        .pipe(
          map((resData: ISetting) => {
            console.log('ttt updateSetting resData', resData);
          })
        );
    }
  }
}
