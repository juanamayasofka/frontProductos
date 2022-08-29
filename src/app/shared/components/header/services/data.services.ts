import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DetailsOrder, Order } from "src/app/shared/interfaces/order.interface";
import { Stores } from "src/app/shared/interfaces/stores.interfaces";


@Injectable({
    providedIn: 'root'
})

export class DataService {

    private apiURL = 'http://localhost:3000';

    constructor(private http: HttpClient){

    }

    getStores(): Observable<Stores[]>{
        return this.http.get<Stores[]>(`${this.apiURL}/stores`)   
    }

    saveOrder(order: Order): Observable<any>{
        return this.http.post<Order>(`${this.apiURL}/orders`, order);
    }

    saveDetailsOrder(details: DetailsOrder): Observable<DetailsOrder>{
        return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details);
    }
}
