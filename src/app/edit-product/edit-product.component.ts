import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe(
      product => {
        if (product) {
          this.product = product;
        } else {
          console.error(`Product with id ${id} not found.`);
          this.router.navigate(['/']);
        }
      },
      error => {
        console.error('Error fetching product:', error);
        this.router.navigate(['/']);
      }
    );
  }

  saveProduct() {
    if (this.product && this.product.productId) {
      // Convert dates to ISO format
      const productToUpdate = { ...this.product };
      console.log(productToUpdate)
      if (productToUpdate.targetCompletionDate instanceof Date) {
        productToUpdate.targetCompletionDate = new Date(productToUpdate.targetCompletionDate.toISOString());
      }

      if (productToUpdate.actualCompletionDate instanceof Date) {
        productToUpdate.actualCompletionDate = new Date(productToUpdate.actualCompletionDate.toISOString());
      }

      this.productService.updateProduct(this.product.productId, productToUpdate).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error updating product:', error);
          // Handle error (e.g., show error message to user)
        }
      );
    } else {
      console.error('Product or product ID is null.');
    }
  }

  cancelEdit() {
    this.router.navigate(['/']);
  }
}