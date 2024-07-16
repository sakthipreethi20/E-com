import { Injectable } from '@angular/core';
import { Order } from '../Datatype';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(private http: HttpClient) { }

  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`http://localhost:8080/orders`, order);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:8080/getAllOrders`);
  }


  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:8080/user/${userId}`);
  }


  // getOrderById(id: number): Observable<Order> {
  //   return this.http.get<Order>(`${this.baseUrl}/${id}`);
  // }
}
