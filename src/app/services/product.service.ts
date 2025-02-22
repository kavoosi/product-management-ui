import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5211/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.map(product => this.convertProductDates(product)))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      map(product => this.convertProductDates(product))
    );
  }

  createProduct(feature: any): Observable<any> {
    return this.http.post(this.apiUrl, feature);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private convertProductDates(product: Product): Product {
    if (product.targetCompletionDate) {
      product.targetCompletionDate = this.convertStringToDate(product.targetCompletionDate);
    }
    if (product.actualCompletionDate) {
      product.actualCompletionDate = this.convertStringToDate(product.actualCompletionDate);
    }
    return product;
  }

  private convertStringToDate(date: any): Date | null {
    if (typeof date === 'string') {
      const dateObj = new Date(date);
      if (!isNaN(dateObj.getTime())) {
        return dateObj;
      }
    }
    return null;
  }
}