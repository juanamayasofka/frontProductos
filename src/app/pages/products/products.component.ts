import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/components/header/services/shopping-cart.service';
import { Product } from './interface/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: Product[];

  constructor(private productSvc: ProductsService,
     private shoppingSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSvc.getProducts()
    .pipe(
      tap((products) => this.products = products)
    ).subscribe();
  }

  addToCart(product: Product): void {
    console.log('add to cart',product);
    this.shoppingSvc.updateCar(product);
  }

}
