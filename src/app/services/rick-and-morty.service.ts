import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Character } from '../models/character.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de personajes con paginación de la API de Rick and Morty.
   */
  async getCharacters(page: number = 1): Promise<{ info: any; results: Character[] }> {
    const url = `${this.API_URL}/character?page=${page}`;
    try {
      return await firstValueFrom(
        this.http.get<{ info: any; results: Character[] }>(url)
      );
    } catch (error) {
      console.error('Error en getCharacters', error);
      throw error;
    }
  }

  /**
   * Obtiene el detalle de un personaje por su ID.
   */
  async getCharacterById(id: number): Promise<Character> {
    const url = `${this.API_URL}/character/${id}`;
    try {
      return await firstValueFrom(this.http.get<Character>(url));
    } catch (error) {
      console.error('Error en getCharacterById', error);
      throw error;
    }
  }
}
