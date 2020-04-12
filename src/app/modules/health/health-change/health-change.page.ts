import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../../services/health.service';
import { HealthChange } from '../../../models/health.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-healthChange',
  templateUrl: './health-change.page.html',
  styleUrls: ['./health-change.page.scss'],
})
export class HealthChangePage implements OnInit {
  isLoading = false;
  healthChanges: HealthChange[];

  constructor(
    private healthService: HealthService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  loadHealthChanges() {
    this.isLoading = true;
    this.healthService
      .loadHealthChanges(this.authService.userId)
      .subscribe((healthChanges) => {
        this.isLoading = false;
        this.healthChanges = healthChanges;
        console.log('ttt ionViewWillEnter', this.healthChanges);
      });
  }
  ionViewWillEnter() {
    console.log('ttt ionViewWillEnter');
    this.loadHealthChanges();
  }

  onDelete(healthChangeId: string) {
    this.isLoading = true;
    this.healthService
      .deleteHealthChange(healthChangeId)
      .subscribe((deletedHealthChangeId) => {
        this.loadHealthChanges();
        this.isLoading = false;
      });
  }
}
