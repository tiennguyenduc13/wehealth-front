import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { SignUpService, SignUpResponseData } from '../../../services/signup.service';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.page.html',
  styleUrls: ['./signUp.page.scss'],
})
export class SignUpPage implements OnInit {
  isLoading = false;

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  signUpUser(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Signing up...' })
      .then((loadingEl) => {
        loadingEl.present();
        let signUpObs: Observable<SignUpResponseData>;
        signUpObs = this.signUpService.signup(email, password);
        signUpObs.subscribe(
          (resData) => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/auth');
          },
          (errRes) => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'Email address could not be found.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'This password is not correct.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchSignUpMode() {
    this.router.navigate(['/', 'auth', 'login']);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    if (password !== confirmPassword) {
      const message = 'Confirm password does not match!';
      this.showAlert(message);
      return;
    }

    this.signUpUser(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'SignUp failed',
        message: message,
        buttons: ['Okay'],
      })
      .then((alertEl) => alertEl.present());
  }
}
