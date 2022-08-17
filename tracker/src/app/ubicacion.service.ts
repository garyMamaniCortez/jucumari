import { Injectable } from '@angular/core';
import { Geolocation, Geoposition, PositionError } from '@awesome-cordova-plugins/geolocation/ngx';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UsuarioService } from './usuario.service';
import { Options } from 'selenium-webdriver';

@Injectable()
export class UbicacionService {

  taxista: AngularFirestoreDocument<any>;
  lngT:any;
  latT:any;
  constructor(private afDB: AngularFirestore,
              private geolocation: Geolocation,
              public _usuarioProvider: UsuarioService) {
                
    this.taxista = afDB.doc(`/usuarios/${_usuarioProvider.clave}`);

  }
  iniciarGeolocalizacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.taxista.update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        clave: this._usuarioProvider.clave
      })
      
      this.lngT=resp.coords.longitude;
      this.latT=resp.coords.latitude;

      let watch = this.geolocation.watchPosition().subscribe(position=>{
        if((position as Geoposition).coords != undefined){
          var geoposition = (position as Geoposition);
          this.taxista.update({
            lat: geoposition.coords.latitude,
            lng: geoposition.coords.longitude,
            clave: this._usuarioProvider.clave
          })
          this.lngT=geoposition.coords.longitude;
          this.latT=geoposition.coords.latitude;
        }else{
          var positionError = (position as PositionError);
          console.log('error' + positionError.code + ': ' + positionError.message);
        }
      })
     }).catch((error) => {
       console.log('Error getting location', error);       
     });
  }
}
