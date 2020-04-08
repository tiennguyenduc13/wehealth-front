import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

import { SettingService } from "./setting.service";
import { AuthService } from "../auth/login/auth.service";
import { ISetting } from "../../models/setting.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import _ from "lodash";

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
            alertDistanceEnabled: new FormControl(
              this.setting.alertDistance && this.setting.alertDistance.enabled
                ? this.setting.alertDistance.enabled
                : false,
              {
                updateOn: "blur",
              }
            ),
            alertDistanceRadius: new FormControl(
              this.setting.alertDistance && this.setting.alertDistance.radius
                ? this.setting.alertDistance.radius
                : false,
              {
                updateOn: "blur",
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
        _.set(this.setting, "alertDistance", {
          enabled: this.form.value.alertDistanceEnabled,
          radius: this.form.value.alertDistanceRadius,
        });
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
