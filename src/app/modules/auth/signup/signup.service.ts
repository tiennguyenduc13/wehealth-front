import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';

export interface SignUpResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private _userIsSignUpenticated = false;
  private _userId: string = null;
  private _loginName: string = null;

  get userIsSignUpenticated() {
    return this._userIsSignUpenticated;
  }

  get userId(): string {
    return this._userId;
  }

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<SignUpResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${environment.firebaseAPIKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  logout() {
    this._userIsSignUpenticated = false;
  }
}
