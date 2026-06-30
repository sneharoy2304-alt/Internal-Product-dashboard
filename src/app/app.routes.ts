import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { ProductFormComponent } from './components/product-form/product-form';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'add', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent }
];
