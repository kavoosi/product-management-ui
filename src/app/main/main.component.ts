import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null;

  constructor(private ProductService: ProductService) { }

  ngOnInit() {
    this.ProductService.getProducts().subscribe(data => {
      this.products = data;
      console.log('Products loaded:', this.products);
    });
  }

  deleteProductWithConfirmation(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.ProductService.deleteProduct(productId).subscribe(() => {
        this.products = this.products.filter(product => product.productId !== productId);
      });
    }
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  saveProduct(product: Product) {
    const index = this.products.findIndex(p => p.productId === product.productId);
    if (index !== -1) {
      this.products[index] = product;
    }
    this.editingProduct = null;
  }

  cancelEdit() {
    this.editingProduct = null;
  }
}