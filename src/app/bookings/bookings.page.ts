import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

import { ProfileService } from "./profile.service";
import { AuthService } from "../auth/auth.service";
import { IProfile } from "./profile.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit {
  isLoading = false;
  form: FormGroup;
  profile: IProfile;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    console.log("ttt ngOnInit");
    this.route.paramMap.subscribe((paramMap) => {
      console.log("ttt2 ngOnInit", paramMap);
      this.isLoading = true;
      this.profileService.loadProfile(this.authService.userId).subscribe(
        (profile: IProfile) => {
          console.log("ttt23 ngOnInit", profile);
          this.profile = profile;
          this.form = new FormGroup({
            email: new FormControl(this.authService.loginName, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            cellPhone: new FormControl(
              this.profile.cellPhone ? this.profile.cellPhone : "",
              {
                updateOn: "blur",
                validators: [Validators.required],
              }
            ),
          });
          this.isLoading = false;

          this.alertCtrl
            .create({
              header: "Profile",
              message: "Profile saved!",
              buttons: [
                {
                  text: "Okay",
                  handler: () => {
                    console.log("Save done");
                  },
                },
              ],
            })
            .then((alertEl) => {
              alertEl.present();
            });
        },
        (error) => {
          this.alertCtrl
            .create({
              header: "An error occurred!",
              message: "Profile could not be fetched. Please try again later.",
              buttons: [
                {
                  text: "Okay",
                  handler: () => {
                    console.log("error", error);
                  },
                },
              ],
            })
            .then((alertEl) => {
              alertEl.present();
            });
        }
      );
    });
  }

  onUpdateProfile() {
    // if (!this.form.valid) {
    //   return;
    // }
    console.log("enter onUpdateProfile");
    this.loadingCtrl
      .create({
        message: "Updating profile...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.profile.email = this.form.value.email;
        this.profile.cellPhone = this.form.value.cellPhone;
        console.log("onUpdateProfile this.profile", this.profile);

        this.profileService
          .updateProfile(this.authService.userId, this.profile)
          .subscribe(() => {
            loadingEl.dismiss();
          });
      });
  }
}
