import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { OrgService } from '../../../../services/org.service';
import { AuthService } from '../../../../services/auth.service';
import { Org } from '../../../../models/org.model';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Message, IMessage } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import * as util from '../../../../shared/util';

@Component({
  selector: 'app-org',
  templateUrl: './org-social.page.html',
  styleUrls: ['./org-social.page.scss'],
})
export class OrgSocialPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private orgService: OrgService,
    private authService: AuthService,
    private messageService: MessageService,
    private alertCtrl: AlertController
  ) {}
  isLoading = false;
  form: FormGroup;
  org: Org;
  messages: Message[] = [];
  message: IMessage;

  loadMessages() {
    this.isLoading = true;
    this.messageService
      .loadMessages(this.org._id)
      .subscribe((messages: Message[]) => {
        this.isLoading = false;
        this.messages = messages;

        console.log('ttt ionViewWillEnter', this.messages);
      });
  }
  loadOrg(orgId: string) {
    this.isLoading = true;
    this.orgService.loadOrg(orgId).subscribe((org: Org) => {
      this.isLoading = false;
      this.org = org;

      this.message = {
        userId: this.authService.userId,
        userName: this.authService.loginName,
        orgId: this.org._id,
        text: '',
        eventDate: new Date(),
      };

      this.loadMessages();
    });
  }

  ngOnInit() {
    console.log('ttt ngOnInit');
    this.route.paramMap.subscribe((paramMap) => {
      console.log('ngOnInit', paramMap);
      const orgId = paramMap.get('orgId');
      this.loadOrg(orgId);

      this.form = new FormGroup({
        messageText: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
      });
    });
  }

  getTime(eventDate: Date): string {
    return util.getTimeFormat(eventDate);
  }
  onSendMessage() {
    // if (!this.form.valid) {
    //   return;
    // }
    console.log('enter onSendMessage');
    this.isLoading = true;

    this.message.text = this.form.get('messageText').value;

    console.log('onSendMessage message', this.message);
    this.messageService
      .addMessage(this.message)
      .subscribe((newMessage: Message) => {
        this.isLoading = false;
        // add message to list
        this.messages.push(newMessage);
        // reset form
        this.form.get('messageText').setValue('');
      });
  }

  onInvite() {
    this.alertCtrl
      .create({
        header: 'Invite someone',
        message: 'Enter invitee\'s email:',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'Invitee\' email...',
          },
        ],
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
            text: 'Send Invitation',
            handler: (email) => {
              console.log('Confirm Okay');
              this.sendInvitation(this.org._id, this.authService.userId, email);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  sendInvitation(orgId: string, userId: string, inviteeEmail: string) {
    // this.isLoading = true;
    // this.orgService.addMember(orgId, memberId).subscribe((org: Org) => {
    //   console.log('Added', org.members);
    //   this.isLoading = false;
    // });
  }
}
