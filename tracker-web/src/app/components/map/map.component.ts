import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  position={
    lat:-17.359886,
    lng:-66.171915
  }
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerPosition:google.maps.LatLngLiteral;
  taxistas:any
  siguiendoA: string = '';
  siguiendoNombre: string = '';
  siguiendo:boolean=false;
  interval:any;
  formatMap:boolean=false;
  addMarker() {

    this.markerPositions=[];
    this.markerPositions.push(this.position);
  }
  removeMarker(){
    
    this.markerPositions=[]
  }
  constructor(db: AngularFirestore) {
    db.collection('usuarios').valueChanges().subscribe((
      data:any[]
    )=>{
      this.taxistas=data
      if ( this.siguiendoA!='' ) {
        data.forEach( taxista => {
          if ( taxista.clave === this.siguiendoA ) {
            this.position.lat = taxista.lat;
            this.position.lng= taxista.lng;
            this.addMarker()
          }
        });
      }
    }
    
    );
   }

  ngOnInit(): void {
    this.interval=setInterval(()=>this.changeState(),500)
  }
  changeState(){
    this.formatMap=!this.formatMap;
  }
  seguir( taxista:any ) {
    this.siguiendoA = taxista.clave;
    this.siguiendoNombre = taxista.nombre;
    this.position.lat = taxista.lat;
    this.position.lng= taxista.lng;
    this.siguiendo=true;
    this.addMarker()
  }
  dejarDeSeguir() {
    this.siguiendoA = '';
    this.siguiendoNombre = '';
    this.siguiendo=false;
    this.markerPositions=[];
  }
  

}
