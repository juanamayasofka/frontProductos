import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/components/header/services/shopping-cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  total$ = this.shoppingCarSvc.totalAction$;
  car$ = this.shoppingCarSvc.carAction$;

  constructor(private shoppingCarSvc: ShoppingCartService) { }

  ngOnInit(): void {
  }


 
}
