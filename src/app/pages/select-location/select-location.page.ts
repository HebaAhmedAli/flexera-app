import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
// import { google } from '@types/google-maps';


@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.page.html',
  styleUrls: ['./select-location.page.scss'],
})
export class SelectLocationPage implements OnInit {
  @ViewChild('map') mapElement!: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect!: ElementRef;

  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;

  constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMapsService, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ModalController) {
      this.searchDisabled = true;
      //this.saveDisabled = true;
  }

  ngOnInit(): void {

  }

  ionViewDidEnter(): void {
    console.log('inside ionViewDidLoad')

      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
        console.log('inside maps.init then')

          this.autocompleteService = new google.maps.places.AutocompleteService();
          this.placesService = new google.maps.places.PlacesService(this.maps.map);
          this.searchDisabled = false;

      });

  }

  selectPlace(place: any){

      this.places = [];

  

      this.placesService.getDetails({placeId: place.place_id}, (details: any) => {

          this.zone.run(async () => {

             // location.name = details.name;

             this.maps.location.lat = details.geometry.location.lat();
             this.maps.location.lng = details.geometry.location.lng();
             this.maps.location.name = place.description;

              // this.saveDisabled = false;
              console.log(this.maps.location.lat, this.maps.location.lng);
              this.maps.marker.setPosition({lat: this.maps.location.lat, lng: this.maps.location.lng});
              this.maps.map.setCenter({lat: this.maps.location.lat, lng: this.maps.location.lng});

          });

      });

  }

  searchPlace(){

      // this.saveDisabled = true;

      if(this.query.length > 0 && !this.searchDisabled) {

          let config = {
              types: ['establishment', 'geocode'],
              input: this.query,
              componentRestrictions: { country: 'eg' }
          }

          this.autocompleteService.getPlacePredictions(config, (predictions: any, status: any) => {

              if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

                  this.places = [];

                  predictions.forEach((prediction: any) => {
                      this.places.push(prediction);
                  });
              }

          });

      } else {
          this.places = [];
      }

  }

  save(){
      this.viewCtrl.dismiss(this.maps.location);
  }

  close(){
      this.viewCtrl.dismiss();
  }

}
