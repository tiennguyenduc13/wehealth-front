import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../../services/places.service';
import { HealthChange } from '../../../models/place.model';
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
}
