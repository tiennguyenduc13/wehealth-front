import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/models/org.model';
import { OrgService } from 'src/app/services/org.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-orgs',
  templateUrl: './my-orgs.page.html',
  styleUrls: ['./my-orgs.page.scss'],
})
export class MyOrgsPage implements OnInit {
  isLoading = false;
  orgs: Org[] = [];

  constructor(
    private orgService: OrgService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  loadOrgs() {
    this.isLoading = true;
    this.orgService.loadOrgs(this.authService.userId).subscribe((orgs) => {
      this.isLoading = false;
      this.orgs = orgs;
      console.log('ttt ionViewWillEnter', this.orgs);
    });
  }
  ionViewWillEnter() {
    this.loadOrgs();
  }
}
