import { Injectable } from '@angular/core';
import * as L from 'leaflet';

/**
 * Servicio para encapsular la lógica de Leaflet:
 * - Creación de mapas
 * - Trazado de rutas
 * - Cálculo de distancias (Haversine)
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {

  /**
   * Crea un mapa Leaflet en el contenedor con ID containerId,
   * centrado en 'center' y con nivel de zoom 'zoom'.
   */
  createMap(containerId: string, center: L.LatLngExpression, zoom: number): L.Map {
    const map = L.map(containerId, { center, zoom });

    // Capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    return map;
  }

  /**
   * Dibuja una polyline en el mapa entre los puntos indicados.
   */
  drawRoute(map: L.Map, points: L.LatLngExpression[], color: string = 'blue'): void {
    L.polyline(points, { color }).addTo(map);
  }

  /**
   * Calcula la distancia en km usando la fórmula Haversine.
   */
  haversine(coord1: number[], coord2: number[]): number {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
