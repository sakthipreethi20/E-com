import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Order } from '../Datatype';
import { OrderHistoryService } from '../services/orderhistory.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.scss',
})
export class OrderhistoryComponent {
  orders: Order[] = [];
  userId: number = 1;
  
  constructor(private orderhistory: OrderHistoryService) {}

  
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderhistory.getAllOrders().subscribe(orders => {  
      this.orders = orders;
      console.log(this.orders,"orders")
    });
  }


  // ngOnInit(): void {
  //   this.fetchUserOrders();
  // }

  // fetchUserOrders(): void {
  //   this.orderhistory.getUserOrders(this.userId).subscribe(
  //     (orders: Order[]) => {
  //       this.orders = orders;
  //       console.log(this.orders,"orders")
  //     },
  //     (error) => {
  //       console.error('Error fetching orders:', error);
  //     }
  //   );
  // }

 
  
}
