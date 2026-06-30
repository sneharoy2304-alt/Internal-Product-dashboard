import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 50000,
      category: 'Electronics',
      onSale: true,
      description: 'High performance laptop',
      inStock: true
    },
    {
      id: 2,
      name: 'Shoes',
      price: 2000,
      category: 'Fashion',
      onSale: false,
      description: 'Comfortable shoes',
      inStock: true
    },
    {
      id: 3,
      name: 'Coffee Maker',
      price: 3500,
      category: 'Home Appliances',
      onSale: true,
      description: 'Brews the perfect cup',
      inStock: false
    },
    {
      id: 4,
      name: 'Science Fiction Novel',
      price: 450,
      category: 'Books',
      onSale: false,
      description: 'A thrilling space adventure',
      inStock: true
    },
    {
      id: 5,
      name: 'Action Figure',
      price: 999,
      category: 'Toys',
      onSale: true,
      description: 'Collectible superhero figurine',
      inStock: true
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>([...this.products]);
  products$ = this.productsSubject.asObservable();

  getProducts() {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  private emit() {
    // emit a fresh copy to avoid external mutation
    this.productsSubject.next([...this.products]);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.emit();
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.emit();
    }
  }
}