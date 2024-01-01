import { Injectable } from '@angular/core';
import { ConnectivityService } from './connectivity.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  marker: any;
  markerDragStartListener: any;
  markerDragEndListener: any;

  location: {lat: any, lng: any, name: string} =  {lat: null, lng: null, name: 'Map detailed address'};


  constructor(public connectivityService: ConnectivityService, public geolocation: Geolocation) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    console.log('inside map init')
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){
      

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          (window as { [key: string]: any })['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(environment.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + environment.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {

        console.log("else Google maps JavaScript needs to be loaded.");

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {
      console.log('to call')

      this.geolocation.getCurrentPosition().then(async (position) => {
        console.log('inside get currentPosition')

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;
        this.getGeoCodedAddress(this.location.lat, this.location.lng);


        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        const sourceIconUrl = 'assets/pin.png';
      

      const sourceIcon = {
        url: sourceIconUrl,
        scaledSize: new google.maps.Size(50, 50), // scaled size
        // origin: new googleMaps.Point(0, 0), // origin
        // anchor: new googleMaps.Point(0, 0) // anchor
      };

      this.marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: sourceIcon,
      });

      this.marker.setMap(this.map);

      this.map.setCenter(latLng);
      this.addMarkerEventListeners(google.maps);
        resolve(true);

      });

    });

  }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {
      console.log('inside addConnectivityListeners watch online')

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {
      console.log('inside addConnectivityListeners watch offline')

      this.disableMap();

    });

  }

  addMarkerEventListeners(googleMaps: any) {


    this.markerDragStartListener = googleMaps.event.addListener(this.marker, 'dragstart', () => {
      this.map.setOptions({ draggable: false });
    });

    this.markerDragEndListener = googleMaps.event.addListener(this.marker, 'dragend', () => {
      console.log('marker drag end: ', this.marker);
      this.map.setOptions({ draggable: true });
      this.moveMapToMarkerAtCenter();
    });
  }


  async moveMapToMarkerAtCenter() {
    const markerPosition = this.marker.getPosition();
    this.map.setCenter(markerPosition);
    this.location.lat = markerPosition.lat();
    this.location.lng =  markerPosition.lng();
    this.getGeoCodedAddress(markerPosition.lat(), markerPosition.lng());
  }

  async getGeoCodedAddress(lat: number, lng: number) {
    let formatted_address;

    if (navigator.geolocation) {
      const geocoder = await new google.maps.Geocoder();
      const latlng = await new google.maps.LatLng(lat, lng);
      const request = { location: latlng };

      await new Promise((resolve, reject) =>{

        geocoder.geocode(request, (results: any, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log(results);
            
            const result = results[0];

            const rsltAdrComponent = result.address_components;
            this.location.name = result.formatted_address;

          }

        });
      });
    }

  }

}
