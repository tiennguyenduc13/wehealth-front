import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InviteService } from 'src/app/services/invite.service';
import { Invite, IInvite } from 'src/app/models/invite.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  isLoading = false;
  invites: Invite[] = [];

  constructor(
    private alertCtrl: AlertController,
    private inviteService: InviteService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadInvites();
  }

  loadInvites() {
    this.isLoading = true;
    this.inviteService
      .loadInvitesByInviteeId(this.authService.userId)
      .subscribe((invites) => {
        this.isLoading = false;
        this.invites = invites;
        console.log('ttt ionViewWillEnter', this.invites);
      });
  }
  showConfirmDialog(invite: Invite) {
    this.alertCtrl
      .create({
        header: 'Invitation',
        message: invite.inviteText,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: ');
            },
          },
          {
            text: 'Accept',
            handler: () => {
              console.log('Confirm Okay ');
              this.inviteService.acceptInvite(invite._id).subscribe((org) => {
                this.isLoading = false;
                console.log('Updated org', org);
                this.loadInvites();
              });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
  onReview(inviteId: string) {
    this.isLoading = true;
    this.inviteService.loadInvite(inviteId).subscribe((invite) => {
      this.isLoading = false;
      this.showConfirmDialog(invite);
    });
  }
}
