import { Routes } from '@angular/router';
import { ApiService } from './services/api.service';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'character-detail/:id',
    loadComponent: () => import('./pages/character-detail/character-detail.page').then( m => m.CharacterDetailPage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'delete',
    loadComponent: () => import('./pages/delete/delete.page').then( m => m.DeletePage)
  },
  {
    path: 'testdb',
    loadComponent: () => import('./pages/testdb/testdb.page').then( m => m.TestdbPage)
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos.page').then( m => m.ProductosPage)
  },
  {
    path: 'producto-detail',
    loadComponent: () => import('./pages/producto-detail/producto-detail.page').then( m => m.ProductoDetailPage)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.page').then( m => m.FavoritosPage)
  },
  {
    path: 'cambiar-contrasena',
    loadComponent: () => import('./pages/cambiar-contrasena/cambiar-contrasena.page').then( m => m.CambiarContrasenaPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
  },

];
