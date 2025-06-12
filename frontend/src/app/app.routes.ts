import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/text-analyzer/text-analyzer').then(m => m.TextAnalyzer)
  }
];
