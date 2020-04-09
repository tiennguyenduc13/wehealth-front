import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/models/org.model';
import { OrgService } from 'src/app/services/org.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-join-org',
  templateUrl: './join-org.page.html',
  styleUrls: ['./join-org.page.scss'],
})
export class JoinOrgPage implements OnInit {
  isLoading = false;
  orgs: Org[] = [];

  constructor(
    private orgService: OrgService,
    private authService: AuthService
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
}
