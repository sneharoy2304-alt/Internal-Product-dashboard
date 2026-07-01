import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'edit/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
