import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character } from '../../models/character.model';

/**
 * Muestra una lista paginada de personajes de Rick & Morty,
 * permitiendo navegar al detalle de cada personaje.
 */
@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  /**
   * Arreglo de personajes a mostrar en la vista.
   */
  characters: Character[] = [];

  /**
   * Página actual de la paginación.
   */
  currentPage = 1;

  /**
   * Total de páginas disponibles (según la API de Rick & Morty).
   */
  totalPages = 1;

  /**
   * Mensaje de error si ocurre un problema al cargar los personajes.
   */
  errorMessage: string = '';

  /**
   * Indica si se está cargando la lista de personajes.
   * Se usa para mostrar un spinner de carga.
   */
  isLoading: boolean = false;

  /**
   * Inyecta el servicio RickAndMortyService para consumir la API
   * y Router para navegar al detalle de un personaje.
   */
  constructor(
    private rickService: RickAndMortyService,
    private router: Router
  ) {}

  /**
   * Al iniciar el componente, cargamos los personajes de la página actual.
   */
  async ngOnInit() {
    await this.loadCharacters();
  }

  /**
   * Llama al servicio para obtener los personajes de la página 'currentPage'.
   * Maneja estados de carga y error.
   */
  async loadCharacters() {
    this.isLoading = true;
    try {
      const data = await this.rickService.getCharacters(this.currentPage);
      this.characters = data.results;
      this.totalPages = data.info.pages;
    } catch (error) {
      // Si ocurre un error, se muestra el mensaje y se oculta el grid
      this.errorMessage = 'No se pudo cargar la lista de personajes.';
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Navega a la ruta de detalle de un personaje.
   * @param id ID del personaje seleccionado
   */
  goToDetail(id: number) {
    this.router.navigate(['/character', id]);
  }

  /**
   * Avanza a la siguiente página si no es la última.
   */
  async nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.loadCharacters();
    }
  }

  /**
   * Retrocede a la página anterior si no es la primera.
   */
  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadCharacters();
    }
  }
}
