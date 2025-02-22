import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-feature',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-feature.component.html',
  styleUrls: ['./create-feature.component.css']
})
export class CreateFeatureComponent {
  feature = {
    title: '',
    description: '',
    estimatedComplexity: 'S',
    status: 'New',
    targetCompletionDate: null as Date | null,
    actualCompletionDate: null as Date | null,
  };

  constructor(private productService: ProductService, private router: Router) { }

  onSubmit() {
    this.productService.createProduct(this.feature).subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}