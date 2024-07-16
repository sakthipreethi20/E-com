import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, Watch } from '../Datatype';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private item: any[] = [];

  private orderDetails: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor() {}

  addtocart(product: any) {
    this.item.push(product);
  }

  getItems() {
    return this.item;
  }

  // storeOrderDetails(order: Order[]): void {
  //   this.orderDetails.next(order);
  // }

  storeOrderDetails(order: Watch[]): void {
    // Assuming you are directly storing the watch items as orders for simplicity
    const orders: Order[] = order.map(watch => ({
      id: watch.id,
      items: [watch], // Ensure each order contains an array of Watch objects
      totalPrice: parseFloat(watch.price), // Convert totalPrice to number if necessary
      shippingAddress: '', // Add the shipping address if available
      // Add any other properties as needed
    }));
    this.orderDetails.next(orders);
  }

  getOrderDetails(): Observable<Order[]> {
    return this.orderDetails.asObservable();
  }
}
