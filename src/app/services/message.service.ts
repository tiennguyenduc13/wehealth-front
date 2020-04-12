import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage, Message } from '../models/message.model';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageUrl = environment.backendUrl + '/message';
  private _messages = new BehaviorSubject<IMessage[]>([]);

  get messages() {
    return this._messages.asObservable();
  }
  constructor(private http: HttpClient) {}

  loadMessages(orgId: string): Observable<Message[]> {
    return this.http.get<any[]>(`${this.messageUrl}/listByOrgId/${orgId}`).pipe(
      map((resData) => {
        return _.orderBy(resData, ['eventDate'], ['desc']);
      })
    );
  }
  addMessage(message: IMessage) {
    console.log(message);
    return this.http.post<IMessage>(this.messageUrl + '/add', {
      ...message,
      id: null,
    });
  }
}
