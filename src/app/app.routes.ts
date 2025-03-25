import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { MapComponent } from './components/map/map.component';
import { CharacterExistsGuard } from './guards/character-exists.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Layout principal que incluye Navbar y Footer
    children: [
      { path: '', redirectTo: 'characters', pathMatch: 'full' },
      { path: 'characters', component: CharacterListComponent },
      { path: 'character/:id', component: CharacterDetailComponent, canActivate: [CharacterExistsGuard] },
      { path: 'map', component: MapComponent }
    ]
  },
  { path: '**', redirectTo: 'characters' }
];
