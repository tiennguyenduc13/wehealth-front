import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SignUpService } from './signup.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpGuard implements CanLoad {
  constructor(private signUpService: SignUpService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('ttt 111', this.signUpService.userIsSignUpenticated);
    if (!this.signUpService.userIsSignUpenticated) {
      this.router.navigateByUrl('/signUp');
    }
    return this.signUpService.userIsSignUpenticated;
  }
}
