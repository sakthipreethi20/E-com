import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WatchService } from '../services/watch.service';
import { Watch } from '../Datatype';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { addToCart } from '../ngrxStore/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

interface CheckboxItem {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrl: './watches.component.scss',
})
export class WatchesComponent implements OnInit {
  filteredWatches: Watch[] = [];
  filtersApplied: boolean = false;
  searchTerm: string = '';
  watches: Watch[] = [];
  pageSize: number = 3; // Number of items per page
  pageSizeOptions: number[] = [6, 9, 12];
  isInWishlist: { [key: number]: boolean } = {};

  constructor(
    private router: Router,
    private watchService: WatchService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  brands: CheckboxItem[] = [
    { name: 'Titan', checked: false },
    { name: 'Fossil', checked: false },
    { name: 'Casio', checked: false },
    { name: 'Timex', checked: false },
    
  ];

  features: CheckboxItem[] = [
    { name: 'leather', checked: false },
    { name: 'stainless steel', checked: false },
    { name: 'metal', checked: false },
    
  ];

  priceRanges: CheckboxItem[] = [
    { name: '1000 - 3000', checked: false },
    { name: '3000 - 5000', checked: false },
    { name: '5000 - 10000', checked: false },
    { name: '10000 - 15000', checked: false },
  ];

  ngOnInit(): void {
    this.watches = [];
    console.log(this.brands, 'brands');
    console.log(this.features, 'features');
    console.log(this.priceRanges, 'price');
    this.loadWatches();
    this.updateWishlistStatus();
  }

  buynow(watch: Watch) {
    this.watchService.setSelectedWatch(watch);
    this.router.navigate(['/checkout']);
  }
  addToCart(watch: Watch) {
    console.log('Cart is added:');
    this.store.dispatch(addToCart({ watch }));
    this.openSnackBar('Item added to cart');
  }
  
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  Wishlist(watch: Watch): void {
    const watchId = watch.id;
    this.watchService.toggleWishlist(watchId);
    console.log('Wishlist status toggled for watch with ID:', watchId);
    if (this.InWishlist(watchId)) {
      this.addToWishlistComponent(watch);
    } else {
      this.removeFromWishlistComponent(watch);
    }
  }

  InWishlist(watchId: number): boolean {
    return this.watchService.isInWishlist(watchId);
  }

  addToWishlistComponent(watch: Watch): void {
    // Add the watch to the wishlist component
    this.watchService.addToWishlist(watch);
    console.log('Added to wishlist:', watch);
  }

  removeFromWishlistComponent(watch: Watch): void {
    // Remove the watch from the wishlist component
    this.watchService.removeFromWishlist(watch.id);
    console.log('Removed from wishlist:', watch);
  }
  updateWishlistStatus(): void {
    this.watchService.wishlist$.subscribe((wishlist) => {
      wishlist.forEach((item) => {
        this.isInWishlist[item.id] = true;
      });
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredWatches = this.watches.slice(startIndex, endIndex);
  }

  loadWatches(): void {
    this.watchService.getAllWatches().subscribe(
      (watches) => {
        this.watches = watches;
        this.applyFilters();
        console.log(watches, 'AllWatches');
      },
      (error) => {
        console.error('Error fetching watches:', error);
      }
    );
  }
  goToWatchDetails(watchId: number): void {
    console.log(watchId, '--watch-id');
    this.watchService.getWatchesById(watchId).subscribe((watch) => {
      this.watchService.setSelectedWatch(watch);
      this.router.navigate(['/watchdetails']);
    });
  }

  applyFilters(): void {
    this.filteredWatches = this.watches.filter(
      (watch) =>
        this.filterByBrand(watch) &&
        this.filterByFeature(watch) &&
        this.filterByPrice(watch)
    );
    this.filtersApplied = true;
    console.log('Filtered Watches:', this.filteredWatches);
  }

  filterByBrand(watch: Watch): boolean {
    return (
      this.brands.some(
        (brand) => brand.checked && watch.brand === brand.name
      ) || this.brands.every((brand) => !brand.checked)
    );
  }

  filterByFeature(watch: Watch): boolean {
    return (
      this.features.some(
        (feature) =>
          feature.checked &&
          watch.strapMaterial.toLowerCase() === feature.name.toLowerCase()
      ) || this.features.every((feature) => !feature.checked)
    );
  }

  filterByPrice(watch: Watch): boolean {
    return (
      this.priceRanges.some(
        (range) =>
          range.checked &&
          this.isPriceInRange(parseFloat(watch.price), range.name)
      ) || this.priceRanges.every((range) => !range.checked)
    );
  }
  isPriceInRange(price: number, range: string): boolean {
    const [min, max] = range.split('-').map((val) => parseInt(val.trim()));
    if (max) {
      return price >= min && price <= max;
    } else {
      return price >= min;
    }
  }
}
