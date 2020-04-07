import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlacesService } from '../places.service';
import { HealthChange } from '../place.model';
import { AuthService } from 'src/app/auth/login/auth.service';

@Component({
  selector: 'app-healthChange',
  templateUrl: './health-change.page.html',
  styleUrls: ['./health-change.page.scss'],
})
export class HealthChangePage implements OnInit, OnDestroy {
  isLoading = false;
  private placesSub: Subscription;
  healthChanges: HealthChange[];

  constructor(
    private placesService: PlacesService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  loadHealthChanges() {
    this.isLoading = true;
    this.placesService
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

  onDelete(id: string) {
    this.isLoading = true;
    this.placesService.deleteHealthChange(id).subscribe((healthChangeId) => {
      this.loadHealthChanges();
    });
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
