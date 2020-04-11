import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/models/org.model';
import { OrgService } from 'src/app/services/org.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-other-orgs',
  templateUrl: './other-orgs.page.html',
  styleUrls: ['./other-orgs.page.scss'],
})
export class OtherOrgsPage implements OnInit {
  isLoading = false;
  orgs: Org[] = [];

  constructor(
    private orgService: OrgService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  loadOrgs() {
    this.isLoading = true;
    this.orgService
      .loadOrgsExceptMember(this.authService.userId)
      .subscribe((orgs) => {
        this.isLoading = false;
        this.orgs = orgs;
        console.log('ttt ionViewWillEnter', this.orgs);
      });
  }
  ionViewWillEnter() {
    this.loadOrgs();
  }
  onJoin(orgId: string) {
    console.log('ttt onJoin orgId', orgId);

    this.alertCtrl
      .create({
        header: 'Request to join',
        message: 'Introduce yourself here',
        inputs: [
          {
            name: 'txtIntro',
            type: 'textarea',
            placeholder: 'Introduction...',
          },
        ],
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: ');
            },
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Confirm Okay');
              this.addMember(orgId, this.authService.userId);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
  addMember(orgId: string, memberId: string) {
    this.isLoading = true;
    this.orgService.addMember(orgId, memberId).subscribe((org: Org) => {
      console.log('Added', org.members);
      this.isLoading = false;
    });
  }
}
