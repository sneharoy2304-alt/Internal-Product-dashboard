import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnInit {
  isEdit = false;
  productId!: number;
  message = '';

  // product object used for template-driven portion
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    description: '',
    inStock: false,
    onSale: false
  };

  // reactive form
  productForm!: FormGroup;

  // toggle between form types
  useReactive = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: [''],
      inStock: [false],
      onSale: [false]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.productId = Number(id);

      const product = this.productService.getProducts()
        .find(p => p.id === this.productId);

      if (product) {
        this.product = { ...product };
        this.productForm.patchValue(product);
      }
    }
  }

  onReactiveSubmit() {
    if (this.productForm.valid) {
      this.saveProduct({
        id: this.isEdit ? this.productId : Date.now(),
        ...this.productForm.value
      } as Product);
    }
  }

  onTemplateSubmit(form: NgForm) {
    if (form.valid) {
      this.saveProduct({
        id: this.isEdit ? this.productId : Date.now(),
        ...form.value
      } as Product);
    }
  }

  private saveProduct(productData: Product) {
    if (this.isEdit) {
      this.productService.updateProduct(productData);
    } else {
      this.productService.addProduct(productData);
    }

    this.message = this.isEdit ? 'Product Updated!' : 'Product Added!';
    // clear toast after a couple seconds
    setTimeout(() => (this.message = ''), 2000);
    // navigate back immediately so list component can refresh from service
    this.router.navigate(['/']);
  }
}