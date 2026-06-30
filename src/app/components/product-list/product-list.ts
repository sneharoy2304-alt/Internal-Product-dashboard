import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { OnSaleHighlightDirective } from '../../directives/on-sale-highlight';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, OnSaleHighlightDirective],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText = '';
  inStockOnly = false;
  onSaleOnly = false;

  @Output() productSelected = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    // subscribe to the service stream so updates propagate immediately
    this.productService.products$.subscribe(list => {
      this.products = list;
      this.filterProducts(); // apply current filters
    });

    // also watch navigation in case of manual back button
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // ensure we always re-fetch, even if filters are cleared or changed
        this.products = this.productService.getProducts();
        this.filterProducts();
      }
    });
  }

  ngOnInit() {
    // nothing needed here now; initial list comes via subscription
  }

  private reloadProducts() {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(p => {
      const matchesText =
        this.searchText === '' ||
        p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        p.category.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStock = !this.inStockOnly || p.inStock;
      const matchesSale = !this.onSaleOnly || p.onSale;

      return matchesText && matchesStock && matchesSale;
    });
  }

  selectProduct(product: Product) {
    this.productSelected.emit(product);
    // navigate as a fallback/side‑effect
    this.router.navigate(['/detail', product.id]);
  }
}