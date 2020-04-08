import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { IProfile } from "../../models/profile.model";
import { environment } from "../../../environments/environment";
import * as _ from "lodash";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private profileUrl = environment.backendUrl + "/profile";

  constructor(private http: HttpClient) {}
  loadProfile(userId: string): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.profileUrl}/${userId}`).pipe(
      map((resData) => {
        console.log("loadProfile result: ", resData);
        return resData;
      })
    );
  }
  updateProfile(userId, profile) {
    console.log("Calling backend updateProfile", userId, profile);
    if (!_.isEmpty(userId) && !_.isEmpty(profile)) {
      return this.http
        .post<IProfile>(`${this.profileUrl}/updateProfile/${userId}`, profile)
        .pipe(
          map((resData: IProfile) => {
            console.log("ttt updateProfile resData", resData);
          })
        );
    }
  }
}
