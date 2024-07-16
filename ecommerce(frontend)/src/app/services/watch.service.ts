import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Watch } from '../Datatype';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  private selectedWatch: any;
  private wishlistSubject = new BehaviorSubject<Watch[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();
  private wishlist: { [key: number]: boolean } = {};

  constructor(private http: HttpClient) {}

  getAllWatches() {
    return this.http.get<Watch[]>('http://localhost:8080/allwatches');
  }
  getWatchesById(id: number) {
    return this.http.get<Watch>(`http://localhost:8080/watches/${id}`);
  }

  setSelectedWatch(watch: any) {
    this.selectedWatch = watch;
  }

  getSelectedWatch() {
    return this.selectedWatch;
  }

  addToWishlist(watch: Watch): void {
    const currentWishlist = this.wishlistSubject.getValue();
    const updatedWishlist = [...currentWishlist, watch];
    console.log('Updated Wishlist:', updatedWishlist);
    this.wishlistSubject.next(updatedWishlist);
  }

  isInWishlist(watchId: number): boolean {
    return !!this.wishlist[watchId];
  }

  toggleWishlist(watchId: number): void {
    // this.wishlist[watchId] = !this.isInWishlist(watchId);
    if (this.isInWishlist(watchId)) {
      this.removeFromWishlist(watchId);
    } else {
      this.addToWishlistById(watchId);
    }
  }

  private addToWishlistById(watchId: number): void {
    this.wishlist[watchId] = true;
    const currentWishlist = this.wishlistSubject.getValue();
    const watch = currentWishlist.find((item) => item.id === watchId);
    if (watch) {
      this.addToWishlist(watch);
    }
  }

  removeFromWishlist(watchId: number): void {
    delete this.wishlist[watchId];
    const currentWishlist = this.wishlistSubject.getValue();
    const updatedWishlist = currentWishlist.filter(
      (item) => item.id !== watchId
    );
    this.wishlistSubject.next(updatedWishlist);
    this.updateWishlistStorage(updatedWishlist);
  }

  private updateWishlistStorage(wishlist: Watch[]): void {
    console.log('Updated Wishlist:', wishlist);
  }
}
