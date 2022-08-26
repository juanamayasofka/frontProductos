import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from '../interface/product.interface';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent  {
  
  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<Product>();
 

 addProduct(): void {
    this.addToCartClick.emit(this.product)
 }

}
