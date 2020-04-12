import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPositionMap } from '../models/position-map.model';

import { BehaviorSubject, Observable } from 'rxjs';
import { IHealthChange, HealthChange } from '../models/health.model';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private healthChangeUrl = environment.backendUrl + '/health-change';
  private _healthChanges = new BehaviorSubject<IHealthChange[]>([]);
  private positionMapUrl = environment.backendUrl + '/position-map';

  get healthChanges() {
    return this._healthChanges.asObservable();
  }
  constructor(private http: HttpClient) {}
  updatePosition(userId, position) {
    console.log('ttt000 calling backend updatePosition', userId, position);
    if (!_.isEmpty(userId) && !_.isEmpty(position)) {
      return this.http
        .post<IPositionMap>(
          `${this.positionMapUrl}/updatePosition/${userId}`,
          position
        )
        .pipe(
          map((resData: IPositionMap) => {
            console.log('ttt updatePosition resData', resData);
          })
        );
    }
  }
  loadPositionMaps(): Observable<IPositionMap[]> {
    return this.http.get<IPositionMap[]>(`${this.positionMapUrl}/list`).pipe(
      map((resData) => {
        return resData;
      })
    );
  }

  loadHealthChanges(userId: string): Observable<HealthChange[]> {
    return this.http
      .get<any[]>(`${this.healthChangeUrl}/listByUserId/${userId}`)
      .pipe(
        map((resData) => {
          return _.orderBy(resData, ['eventDate'], ['desc']);
        })
      );
  }
  addHealthChange(healthChange: IHealthChange) {
    console.log(healthChange);
    return this.http.post<IHealthChange>(this.healthChangeUrl + '/add', {
      ...healthChange,
      id: null,
    });
  }
  deleteHealthChange(healthChangeId: string) {
    console.log('Delete ', healthChangeId);
    return this.http.post<string>(
      `${this.healthChangeUrl}/delete/${healthChangeId}`,
      {}
    );
  }
  updateHealthSignals(userId, healthSignals: string[]) {
    console.log('ttt000 calling backend updateHealthSignals', userId, {
      healthSignals,
    });
    if (!_.isEmpty(userId) && !_.isEmpty(healthSignals)) {
      return this.http
        .post<IPositionMap>(
          `${this.positionMapUrl}/updateHealthSignals/${userId}`,
          healthSignals
        )
        .pipe(
          map((resData: IPositionMap) => {
            console.log('ttt updateHealthSignals resData', resData);
          })
        );
    }
  }
}
