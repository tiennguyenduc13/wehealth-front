import { Component, OnInit, Input } from '@angular/core';
import { Invite } from 'src/app/models/invite.model';

@Component({
  selector: 'app-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.scss'],
})
export class MailItemComponent implements OnInit {
  @Input() invite: Invite;
  constructor() {}

  ngOnInit() {
    console.log('Invite ', this.invite);
  }
}
