import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";


@Injectable(
    { providedIn: 'root'}
)

export class ShoppingCartService{
    products: Product[]=[];

    private carSubject = new BehaviorSubject<Product[]>([]);
    private totalSubjet = new BehaviorSubject<number>(0);
    private quantitySubjet = new BehaviorSubject<number>(0);

    get totalAction$(): Observable<number> {
        return this.totalSubjet.asObservable();
    }

    get carAction$(): Observable<Product[]> {
        return this.carSubject.asObservable();
    }

    get quantityAction$(): Observable<number> {
        return this.quantitySubjet.asObservable();
    }


    updateCar(product:Product): void {
        this.addToCar(product);
        this.calcularTotal();
        this.quantityProducts();
       
    }

    /**
     * calculamos el valor total y lo guardamos
     * en el observable.
     */
    private calcularTotal(): void {
        const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.quantity), 0);
        this.totalSubjet.next(total);
    }

    private quantityProducts(): void {
        const quantity = this.products.reduce((acc, prod) => acc += prod.quantity,0);
        this.quantitySubjet.next(quantity);
    }

    private addToCar(product: Product): void {
        const isProductInCart = this.products.find(({id})=> id=== product.id);

        if(isProductInCart){
            isProductInCart.quantity +=1;
        }else {
            this.products.push({ ...product, quantity: 1})
        }
       
        this.carSubject.next(this.products);
    }


    resetCart(): void {
        this.carSubject.next([]);
        this.totalSubjet.next(0);
        this.quantitySubjet.next(0);
        this.products = [];
    }
}