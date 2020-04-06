import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonItemSliding } from "@ionic/angular";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { IHealthChange } from "../place.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-healthChange",
  templateUrl: "./health-change.page.html",
  styleUrls: ["./health-change.page.scss"],
})
export class HealthChangePage implements OnInit, OnDestroy {
  healthChange: Place[];
  isLoading = false;
  private placesSub: Subscription;
  healthChanges: IHealthChange[];

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.healthChange = places;
    });
  }

  ionViewWillEnter() {
    console.log("ttt ionViewWillEnter");
    this.isLoading = true;
    this.placesService
      .loadHealthChanges(this.authService.userId)
      .subscribe((healthChanges) => {
        this.isLoading = false;
        this.healthChanges = healthChanges;
        console.log("ttt ionViewWillEnter", this.healthChanges);
      });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate([
      "/",
      "places",
      "tabs",
      "healthChange",
      "edit",
      offerId,
    ]);
    console.log("Editing item", offerId);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
