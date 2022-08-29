import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../header/services/shopping-cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent  {


  quantity$ = this.shoppingSvc.quantityAction$;
  total$ = this.shoppingSvc.totalAction$;

  constructor(private shoppingSvc: ShoppingCartService){}

 

}
