import { AfterViewInit, Component } from '@angular/core';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
(mapboxgl as any).accessToken = 'pk.eyJ1IjoicmF1bG1kYXciLCJhIjoiY2xzMHk5dzBzMDVmZjJtcGM5eG91MHA2eCJ9.qxuCr4ile39GDZepM9xT3w';


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-5.980412, 37.356938], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
