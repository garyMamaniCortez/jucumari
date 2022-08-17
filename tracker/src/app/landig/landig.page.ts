import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UbicacionService } from '../ubicacion.service';
import { GoogleMap } from '@capacitor/google-maps';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-landig',
  templateUrl: './landig.page.html',
  styleUrls: ['./landig.page.scss'],
})
export class LandigPage implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  private interval;
  constructor(public navCtrl: NavController,
              public _ubicacionProvider: UbicacionService) {
                this._ubicacionProvider.iniciarGeolocalizacion();
               }

   ngOnInit() {
   this.interval=setInterval(()=>this.markTaxi(),5000)
  }
  ngAfterViewInit(){
    this.createMap()
  
  }
  markTaxi()
  {
    console.log("las",this._ubicacionProvider.latT)
    console.log("lng",this._ubicacionProvider.lngT)
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyAHRQoE6A8uUFVO9Fix-NRJhr9BFZsoeAQ',
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
}
