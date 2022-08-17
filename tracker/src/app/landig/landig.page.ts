import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UbicacionService } from '../ubicacion.service';

@Component({
  selector: 'app-landig',
  templateUrl: './landig.page.html',
  styleUrls: ['./landig.page.scss'],
})
export class LandigPage implements OnInit {

  constructor(public navCtrl: NavController,
              public _ubicacionProvider: UbicacionService) {
                this._ubicacionProvider.iniciarGeolocalizacion();
               }

  ngOnInit() {
  }

}
