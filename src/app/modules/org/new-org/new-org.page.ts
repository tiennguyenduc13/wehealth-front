import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { OrgService } from '../../../services/org.service';
import { AuthService } from '../../../services/auth.service';
import { IOrg, Org } from '../../../models/org.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-org',
  templateUrl: './new-org.page.html',
  styleUrls: ['./new-org.page.scss'],
})
export class NewOrgPage implements OnInit {
  isLoading = false;
  form: FormGroup;
  org: IOrg;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orgService: OrgService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    console.log('ttt ngOnInit');
    this.route.paramMap.subscribe((paramMap) => {
      console.log('ttt2 ngOnInit', paramMap);
      this.org = {
        creatorId: this.authService.userId,
        name: '',
        description: '',
        eventDate: new Date(),
        members: [],
      };
      this.form = new FormGroup({
        name: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        description: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
      });
    });
  }

  onCreateOrg() {
    // if (!this.form.valid) {
    //   return;
    // }
    console.log('enter onCreateOrg');
    this.loadingCtrl
      .create({
        message: 'Updating org...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        console.log(this.isLoading);
        this.org.name = this.form.value.name;
        this.org.description = this.form.value.description;
        console.log('onCreateOrg this.org', this.org);
        this.orgService.addOrg(this.org).subscribe(() => {
          loadingEl.dismiss();

          this.alertCtrl
            .create({
              header: 'Org',
              message: 'Org saved!',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    console.log('Save done');
                    this.router.navigate(['/org/tabs']);
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
