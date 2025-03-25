import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character } from '../../models/character.model';

/**
 * Muestra el detalle de un personaje de Rick & Morty,
 * incluyendo su nombre, estado, especie, género y origen.
 */
@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  /**
   * Objeto que almacena los datos del personaje a mostrar.
   * Se asigna en ngOnInit tras la llamada al servicio.
   */
  character!: Character;

  /**
   * Mensaje de error que se muestra si no se pudo cargar el personaje.
   */
  errorMessage: string = '';

  /**
   * Inyecta ActivatedRoute para obtener el ID de la URL,
   * e inyecta RickAndMortyService para obtener los datos del personaje.
   */
  constructor(
    private route: ActivatedRoute,
    private rickService: RickAndMortyService
  ) {}

  /**
   * Al inicializar el componente, extrae el ID de la ruta
   * y llama al servicio para obtener el detalle del personaje.
   */
  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      this.character = await this.rickService.getCharacterById(id);
    } catch (error) {
      // Si falla la carga, asigna un mensaje de error
      this.errorMessage = 'No se pudo cargar el detalle del personaje.';
    }
  }
}
