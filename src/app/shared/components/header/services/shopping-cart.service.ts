import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";


@Injectable(
    { providedIn: 'root'}
)

export class ShoppingCartService{
    products: Product[]=[];

    private carSubject = new Subject<Product[]>();
    private totalSubjet = new Subject<number>();
    private quantitySubjet = new Subject<number>();

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
        const total = this.products.reduce((acc, prod) => acc += prod.price, 0);
        this.totalSubjet.next(total);
    }

    private quantityProducts(): void {
        const quantity = this.products.length;
        this.quantitySubjet.next(quantity);
    }

    private addToCar(product: Product): void {
        this.products.push(product);
        this.carSubject.next(this.products);
    }
}