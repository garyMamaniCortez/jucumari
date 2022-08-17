import { Injectable } from '@angular/core';
import { Geolocation, Geoposition, PositionError } from '@awesome-cordova-plugins/geolocation/ngx';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UsuarioService } from './usuario.service';
import { Options } from 'selenium-webdriver';

@Injectable()
export class UbicacionService {

  taxista: AngularFirestoreDocument<any>;

  constructor(private afDB: AngularFirestore,
              private geolocation: Geolocation,
              public _usuarioProvider: UsuarioService) {
                
    this.taxista = afDB.doc(`/usuarios/${_usuarioProvider.clave}`);

  }

  iniciarGeolocalizacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords);
      this.taxista.update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        clave: this._usuarioProvider.clave
      })
      
      // // let watch = this.geolocation.watchPosition();
      // //   watch.subscribe((data) => {
      // //   // data can be a set of coordinates, or an error (if an error occurred).
      // //   // data.coords.latitude
      // //   // data.coords.longitude
      // //   // this.taxista.update({
      // //   //   lat: resp.coords.latitude,
      // //   //   lng: data,
      // //   //   clave: this._usuarioProvider.clave

      // //   // })
      // //   console.log(data);
      // //   }); 
      let watch = this.geolocation.watchPosition().subscribe(position=>{
        if((position as Geoposition).coords != undefined){
          var geoposition = (position as Geoposition);
          console.log('lat: ' + geoposition.coords.latitude);
          this.taxista.update({
            lat: geoposition.coords.latitude,
            lng: geoposition.coords.longitude,
            clave: this._usuarioProvider.clave
          })
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
