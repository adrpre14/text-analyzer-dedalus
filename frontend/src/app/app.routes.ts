import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/text-analyzer/text-analyzer').then(m => m.TextAnalyzer)
  }
];
