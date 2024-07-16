import { Component } from '@angular/core';
import { Watch } from '../Datatype';
import { WatchService } from '../services/watch.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { addToCart } from '../ngrxStore/cart.actions';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlist: Watch[] = [];

  constructor(
    private watchService: WatchService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.watchService.wishlist$.subscribe((wishlist) => {
      console.log('wishlist items :', wishlist);
      this.wishlist = wishlist;
    });
  }

  removeItem(item: Watch): void {
    const index = this.wishlist.indexOf(item);
    if (index >= 0) {
      this.wishlist.splice(index, 1);
    }
  }

  buynow(watch: Watch) {
    this.watchService.setSelectedWatch(watch);
    this.router.navigate(['/checkout']);
  }
  addToCart(watch: Watch) {
    console.log('Cart is added:');
    this.store.dispatch(addToCart({ watch }));
    alert('Cart is added');
  }
}
