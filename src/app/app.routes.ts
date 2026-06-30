import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'signal', pathMatch: 'full' },
  {
    path: 'signal',
    loadComponent: () => import('./signal/signal').then((m) => m.Signal),
  },
  {
    path: 'components',
    loadComponent: () => import('./components/components').then((m) => m.Components),
  },];
