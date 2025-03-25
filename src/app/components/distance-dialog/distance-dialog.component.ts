// distance-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Muestra un diálogo con la distancia calculada entre dos puntos.
 * Usa data.distance para mostrar el valor en km.
 */
@Component({
  selector: 'app-distance-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './distance-dialog.component.html'
})
export class DistanceDialogComponent {
  /**
   * Recibe la distancia como data.distance en el constructor.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { distance: number }) {}
}
