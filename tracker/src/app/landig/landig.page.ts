import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UbicacionService } from '../ubicacion.service';
import { GoogleMap,Marker } from '@capacitor/google-maps';

import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
@Component({
  selector: 'app-landig',
  templateUrl: './landig.page.html',
  styleUrls: ['./landig.page.scss'],
})
export class LandigPage implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  markerId:string;
  name:string
  private interval;
  constructor(public navCtrl: NavController,
              public _ubicacionProvider: UbicacionService) {
                this._ubicacionProvider.iniciarGeolocalizacion();
               }

   ngOnInit() {
    this.name=localStorage.getItem('clave')
   this.interval=setInterval(()=>this.markTaxi(),5000)
  }
  ngOnDestroy() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }
  ngAfterViewInit(){
    this.createMap()
  }
  endTrip(){
    this.navCtrl.navigateRoot('')
  }
  async markTaxi()
  {
    var myLatlng ={lat:this._ubicacionProvider.latT,lng:this._ubicacionProvider.lngT};
    var marker: Marker=({
      coordinate: myLatlng,
      title:this.name,
  });
  if(this.markerId!=undefined)
  {
    this.newMap.removeMarker(this.markerId)
  }
  this.markerId=await this.newMap.addMarker(marker)
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyAHRQoE6A8uUFVO9Fix-NRJhr9BFZsoeAQ',
      config: {
        center: {
          lat: -17.373013,
          lng: -66.150125,
        },
        zoom: 15,
      },
    });
  }
}
