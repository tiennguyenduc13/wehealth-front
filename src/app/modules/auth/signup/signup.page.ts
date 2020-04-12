import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

import { SignUpService } from '../../../services/signup.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { IProfile, Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.page.html',
  styleUrls: ['./signUp.page.scss'],
})
export class SignUpPage implements OnInit {
  isLoading = false;

  constructor(
    private signUpService: SignUpService,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  createProfile(email: string, userId: string) {
    const profile: IProfile = {
      email: email,
      userId: userId,
      name: '',
      cellPhone: '',
      dateOfBirth: new Date(null),
      gender: 'na',
    };
    console.log('start Create profile ', profile);
    debugger;
    this.profileService
      .updateProfile(profile.userId, profile)
      .subscribe((newProfile: Profile) => {
        console.log('Create profile done', newProfile);
        this.router.navigateByUrl('/auth');
      });
  }
  signUpUser(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Signing up...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.signUpService.signup(email, password).subscribe(
          (resData) => {
            this.isLoading = false;
            loadingEl.dismiss();
            debugger;
            this.createProfile(resData.email, resData.localId);
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
