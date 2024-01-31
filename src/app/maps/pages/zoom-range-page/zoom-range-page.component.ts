import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-5.980412, 37.356938);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML divMap no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'El mapa no se ha inicializado';

    // cambiar valor del zoom en la caja de control
    this.map.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
    });

    // controlar el valor máximo del zoom, cuando el zoom se detiene
    this.map.on('zoomend', (event) => {
      if (this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    // controlar el movimiento del mapa
    this.map.on('move', (event) => {
      this.currentLngLat = this.map!.getCenter();
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
