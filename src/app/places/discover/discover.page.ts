import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
} from "@angular/core";

import { environment } from "../../../environments/environment";
import { Plugins, Capacitor, GeolocationPosition } from "@capacitor/core";
import { AuthService } from "src/app/auth/auth.service";
import { PlacesService } from "../places.service";
import { IPositionMap } from "../position-map.model";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("map", { static: false }) mapElementRef: ElementRef;
  // WhiteHouse lat/lng
  center = { lat: 38.897957, lng: -77.03656 };
  googleMaps: any;
  mainMap: any;

  isLoading = false;
  loginName: string;

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private placeService: PlacesService,
    public backgroundMode: BackgroundMode,
    public platform: Platform
  ) {}
  ionViewWillEnter() {
    console.log("ionViewWillEnter enter ", new Date());
    this.platform.ready().then(() => {
      this.backgroundMode.on("activate").subscribe(() => {
        console.log("ionViewWillEnter activated:---------- ", new Date());
        this.doInterval();
      });

      this.backgroundMode.enable();
    });
  }
  doInterval() {
    console.log("doInterval doing Timer ", new Date().toString());
    this.updatePosition();
    setTimeout(() => {
      this.doInterval();
    }, 30000);
  }
  ngOnInit() {}

  saveMyPosition() {
    this.placeService
      .updatePosition(this.authService.userId, this.center)
      .subscribe((positionMap) => {});
  }

  updatePosition() {
    return this.locateUser()
      .then((geoPosition) => {
        this.center = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        };
        this.isLoading = false;
        this.saveMyPosition();
      })
      .catch((err) => {
        this.isLoading = false;
      });
  }
  ngAfterViewInit() {
    this.loginName = this.authService.loginName;
    this.updatePosition().then(() => {
      this.showMap();
    });
  }
  createMarker(title: string, icon: object, position) {
    return new this.googleMaps.Marker({
      position: position,
      map: this.mainMap,
      title: title,
      icon: icon,
    });
  }
  loadPositionMaps() {
    return this.placeService.loadPositionMaps();
  }
  findMasterHealthSignal(healthSignals: string[]) {
    let master = "normal";
    master = healthSignals.includes("exposed") ? "exposed" : master;
    master = healthSignals.includes("symptoms") ? "symptoms" : master;
    master = healthSignals.includes("positive") ? "positive" : master;

    return master;
  }

  findIconImage(healthSignal: string) {
    return "assets/icon/health/" + healthSignal + ".png";
  }
  shouldShowMarker(healthSignals: string[]): boolean {
    if (
      healthSignals &&
      healthSignals.length &&
      (healthSignals.includes("positive") ||
        healthSignals.includes("symptoms") ||
        healthSignals.includes("exposed"))
    ) {
      return true;
    }
    return false;
  }
  createIcon(url, size) {
    return {
      url: url,
      scaledSize: new this.googleMaps.Size(size, size),
    };
  }
  addMarkers() {
    // get positionMaps
    this.isLoading = true;
    this.loadPositionMaps().subscribe((positionMaps: IPositionMap[]) => {
      // set marker for me
      let marker = this.createMarker(
        "Me",
        this.createIcon("assets/icon/itsme.png", 25),
        this.center
      );
      marker.setMap(this.mainMap);
      positionMaps.forEach((positionMap: IPositionMap) => {
        if (
          positionMap.userId !== this.authService.userId &&
          this.shouldShowMarker(positionMap.healthSignals)
        ) {
          const masterHealthSignal = this.findMasterHealthSignal(
            positionMap.healthSignals
          );
          // set marker for others
          marker = this.createMarker(
            masterHealthSignal,
            this.createIcon(this.findIconImage(masterHealthSignal), 25),
            positionMap.position
          );
          marker.setMap(this.mainMap);
        }
      });
      this.isLoading = false;
    });
  }

  showMap() {
    this.getGoogleMaps()
      .then((googleMaps) => {
        this.googleMaps = googleMaps;
        const mapEl = this.mapElementRef.nativeElement;
        this.mainMap = new googleMaps.Map(mapEl, {
          center: this.center,
          zoom: 16,
        });
        console.log("this.mainMap1", this.mainMap);
        this.addMarkers();

        this.googleMaps.event.addListenerOnce(this.mainMap, "idle", () => {
          console.log("this.mainMap2 idle");
          this.renderer.addClass(mapEl, "visible");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  locateUser(): Promise<GeolocationPosition> {
    if (!Capacitor.isPluginAvailable("Geolocation")) {
      console.log("Capacitor Geolocation not Available!!!");
      return;
    }
    this.isLoading = true;
    return Plugins.Geolocation.getCurrentPosition();
  }
  onCancel() {}

  ngOnDestroy() {}

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          console.log("resolve map");
          resolve(loadedGoogleModule.maps);
        } else {
          console.log("reject map");
          reject("Google maps SDK not available.");
        }
      };
    });
  }
}
