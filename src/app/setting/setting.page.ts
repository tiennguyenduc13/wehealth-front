import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

import { SettingService } from "./setting.service";
import { AuthService } from "../auth/auth.service";
import { ISetting } from "./setting.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"],
})
export class SettingPage implements OnInit {
  isLoading = false;
  form: FormGroup;
  setting: ISetting;

  constructor(
    private route: ActivatedRoute,
    private settingService: SettingService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.isLoading = true;
      this.settingService.loadSetting(this.authService.userId).subscribe(
        (setting: ISetting) => {
          this.setting = setting;
          this.form = new FormGroup({
            alertRadius: new FormControl(
              this.setting.alertRadius ? this.setting.alertRadius : "1",
              {
                updateOn: "blur",
                validators: [Validators.required],
              }
            ),
          });
          this.isLoading = false;
        },
        (error) => {
          this.alertCtrl
            .create({
              header: "An error occurred!",
              message: "Setting could not be fetched. Please try again later.",
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

  onUpdateSetting() {
    // if (!this.form.valid) {
    //   return;
    // }
    console.log("enter onUpdateSetting");
    this.loadingCtrl
      .create({
        message: "Updating setting...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.setting.alertRadius = this.form.value.alertRadius;
        console.log("onUpdateSetting this.setting", this.setting);

        this.settingService
          .updateSetting(this.authService.userId, this.setting)
          .subscribe(() => {
            loadingEl.dismiss();

            this.alertCtrl
              .create({
                header: "Setting",
                message: "Setting saved!",
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
          });
      });
  }
}
