import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
  

}
