import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { DataService } from 'src/app/shared/components/header/services/data.services';
import { ShoppingCartService } from 'src/app/shared/components/header/services/shopping-cart.service';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Stores } from "src/app/shared/interfaces/stores.interfaces";
import { Product } from '../products/interface/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };

  isEntrega = true;
  stores : Stores[] =[]
  cart: Product[] = [];
  constructor(private dataSvc:DataService,
     private shoppingCart: ShoppingCartService,
     private productSvc: ProductsService,
     private router: Router) {
      this.checkIfCartIsEmpty();
      }

  ngOnInit(): void {
    this.getStore();
    this.getDatCart();
  }

  onEntrega(value: boolean): void {
    this.isEntrega = value;
  }

  onSubmit({value: formData}: NgForm): void {
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      entrega: this.isEntrega
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap(res => console.log(res)),
      switchMap(({ id:orderId }) => {
        
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({details, orderId});
      }),
      tap(() => this.router.navigate(['/thanks'])),
      delay(2000),
      tap(() => this.shoppingCart.resetCart())
    ).subscribe();
  }

  private getStore():void {
    this.dataSvc.getStores()
    .pipe(
      tap((stores: Stores[]) => this.stores = stores)
    )
    .subscribe()
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const datails: Details[] = [];
    this.cart.forEach((product:Product) => {
      const {id:productId, name:productName, quantity, stock} = product;
      
      /**Actualizamos el valor del stock */
      const updateStock = ( stock - quantity);
      this.productSvc.updateStock(productId, updateStock)
      .pipe(
        tap(() => datails.push({productId, productName, quantity}))
      )
      .subscribe();
      
    })
    return datails;
  }

  private getDatCart(){
    this.shoppingCart.carAction$
    .pipe(
      tap((products:Product[]) => this.cart = products )
    ).subscribe();
  }

 private checkIfCartIsEmpty(): void {
  this.shoppingCart.carAction$
  .pipe(
    tap((products: Product[]) => {
      if(Array.isArray(products) && !products.length){
        this.router.navigate(['/products']);
      }
    })
  )
  .subscribe();
 }


}
