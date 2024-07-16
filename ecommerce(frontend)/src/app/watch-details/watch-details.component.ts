import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WatchesComponent } from '../watches/watches.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchService } from '../services/watch.service';
import { Watch } from '../Datatype';
import { addToCart } from '../ngrxStore/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-watch-details',
  templateUrl: './watch-details.component.html',
  styleUrl: './watch-details.component.scss',
})
export class WatchDetailsComponent {
  watchId!: number;
  brand: string = '';
  imageUrl: string = '';
  name: string = '';
  strapMaterial: string = '';
  price: string = '';
  selectedWatch!: Watch;
  // price:  number = 0;

  constructor(
    // private route: ActivatedRoute,
    private watchService: WatchService,
    private store: Store,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.selectedWatch = this.watchService.getSelectedWatch();
    console.log('Selected watch:', this.selectedWatch);
  }

  addToCart(watch: Watch) {
    console.log('Cart is added:');
    this.store.dispatch(addToCart({ watch }));
    alert('Cart is added');
  }

  buynow(watch: Watch) {
    this.watchService.setSelectedWatch(watch);
    this.route.navigate(['/checkout']);
  }
}
