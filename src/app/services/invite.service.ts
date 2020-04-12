import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';
import { IInvite, Invite } from '../models/invite.model';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private inviteUrl = environment.backendUrl + '/invite';
  private _invites = new BehaviorSubject<IInvite[]>([]);

  get invites() {
    return this._invites.asObservable();
  }
  constructor(private http: HttpClient) {}

  loadInvitesByInviteeId(inviteeId: string): Observable<Invite[]> {
    console.log('start loadInvites inviteeId', inviteeId);
    return this.http
      .get<any[]>(`${this.inviteUrl}/listByInviteeId/${inviteeId}`)
      .pipe(
        map((resData) => {
          console.log('loadInvites found resData', resData);
          return _.orderBy(resData, ['inviteDate'], ['desc']);
        })
      );
  }
  loadInvitesByInviterId(inviterId: string): Observable<Invite[]> {
    console.log('start loadInvites inviterId', inviterId);
    return this.http
      .get<any[]>(`${this.inviteUrl}/listByInviterId/${inviterId}`)
      .pipe(
        map((resData) => {
          console.log('loadInvites found resData', resData);
          return _.orderBy(resData, ['inviteDate'], ['desc']);
        })
      );
  }
  loadInvite(inviteId: string): Observable<Invite> {
    console.log('start loadInvite inviteId', inviteId);
    return this.http.get<any>(`${this.inviteUrl}/${inviteId}`).pipe(
      map((resData) => {
        console.log('loadInvite found resData', resData);
        return resData;
      })
    );
  }
  addInvite(invite: IInvite) {
    console.log(invite);
    return this.http.post<IInvite>(this.inviteUrl + '/add', {
      ...invite,
      id: null,
    });
  }

  acceptInvite(inviteId: string) {
    console.log('Calling backend updateInvite', inviteId);
    if (!_.isEmpty(inviteId)) {
      return this.http
        .post<IInvite>(`${this.inviteUrl}/acceptInvite/${inviteId}`, {})
        .pipe(
          map((resData: IInvite) => {
            console.log('acceptInvite result resData', resData);
          })
        );
    }
  }
}
