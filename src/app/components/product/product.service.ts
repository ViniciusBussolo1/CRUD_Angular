import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURl = 'http://localhost:3001/products';

  constructor(private snakBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snakBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURl).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseURl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseURl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  delete(id: string): Observable<Product> {
    const url = `${this.baseURl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  erroHandler(error: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
