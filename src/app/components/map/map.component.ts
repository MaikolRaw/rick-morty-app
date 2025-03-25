import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as L from 'leaflet';
import { DistanceDialogComponent } from '../distance-dialog/distance-dialog.component';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MatCard, MatCardHeader, MatCardTitle, MatCardContent,
    MatDialogModule
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;

  // Puntos de ejemplo (Bogotá)
  private startPoint: L.LatLngExpression = [4.5981, -74.0758];
  private endPoint: L.LatLngExpression = [4.6589, -74.0937];

  constructor(
    private mapService: MapService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // 1. Crea el mapa en el contenedor 'map'
    this.map = this.mapService.createMap('map', this.startPoint, 12);

    // 2. Dibuja la ruta entre los puntos
    this.mapService.drawRoute(this.map, [this.startPoint, this.endPoint]);

    // 3. Calcula la distancia
    const distance = this.mapService.haversine(
      this.startPoint as number[],
      this.endPoint as number[]
    );

    // 4. Muestra el diálogo con la distancia
    this.dialog.open(DistanceDialogComponent, {
      data: { distance }
    });

    // 5. Ajusta el tamaño del mapa para evitar tiles "cortados"
    this.map.whenReady(() => {
      this.map.invalidateSize();
      setTimeout(() => this.map.invalidateSize(), 100);
    });
    this.map.on('load', () => {
      setTimeout(() => this.map.invalidateSize(), 100);
    });
  }
}
