import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { RickAndMortyService } from '../services/rick-and-morty.service';

/**
 * Evita que se acceda a la ruta de detalle de un personaje si no existe.
 */
@Injectable({
  providedIn: 'root'
})
export class CharacterExistsGuard implements CanActivate {

  constructor(private rickService: RickAndMortyService, private router: Router) {}

  /**
   * Verifica si el personaje existe llamando a getCharacterById().
   * Si falla (no existe), redirige a '/characters'.
   */
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const id = Number(route.paramMap.get('id'));
    try {
      await this.rickService.getCharacterById(id);
      return true;
    } catch (error) {
      return this.router.createUrlTree(['/characters']);
    }
  }
}
