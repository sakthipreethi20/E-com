import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Watch } from '../Datatype';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../ngrxStore/cart.selector';
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from '../ngrxStore/cart.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems$!: Observable<Watch[]>;

  Price: number = 0;

  constructor(private store: Store, private route: Router) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartItems$.subscribe((items) => {
      console.log('Cart items:', items);
    });
    this.calculatePrice();
  }

  deleteItem(id: number) {
    this.store.dispatch(deleteFromCart({ id }));
    // this.calculateTotalPrice();
  }

  calculatePrice() {
    this.cartItems$.subscribe((items) => {
      this.Price = items.reduce(
        (total: number, item) => total + parseFloat(item.price) * item.quantity,
        0
      );
    });
  }

  incrementQuantity(item: Watch, id: number) {
    this.store.dispatch(incrementQuantity({ id }));
    
  }

  decrementQuantity(item: Watch, id: number) {
    this.store.dispatch(decrementQuantity({ id }));
   
  }

  checkout() {
    this.cartItems$.subscribe((items) => {
      const totalPrice = items.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      );
      this.route.navigate(['/checkout'], {
        queryParams: {
          items: JSON.stringify(items),
          totalPrice: totalPrice.toString(),
        },
      }
     );
     console.log(items)
    });
  }

 
}
