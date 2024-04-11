import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css',
})
export class ProductDeleteComponent {
  product: Product = { id: 0, name: '', price: 0 };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id!).subscribe((product) => {
      this.product = product;
    });
  }

  deleteProduct() {
    this.productService.delete(`${this.product.id}`).subscribe(() => {
      this.productService.showMessage('Produto excluido com sucesso!!!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
