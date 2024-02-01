import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw 'Map Div no encontrado';
    if (!this.lngLat) throw 'LngLat no puede ser nulo';

    // crear mapa
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false,
    });

    // crear marker inicial
    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map);
  }
}
