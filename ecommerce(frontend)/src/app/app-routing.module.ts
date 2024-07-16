import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WatchesComponent } from './watches/watches.component';

import { BrandsComponent } from './brands/brands.component';
import { StoreComponent } from './store/store.component';
import { WatchDetailsComponent } from './watch-details/watch-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AuthGuard } from './services/auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'watch', component: WatchesComponent },
  // { path: 'brand', component: BrandsComponent },
  // { path: 'store', component: StoreComponent },
  // { path: 'contact', component: ContactUsComponent },
  // { path: 'watchdetails', component: WatchDetailsComponent },
  // { path: 'cart', component: CartComponent },
  // { path: 'checkout', component: CheckoutComponent },
  // { path: 'wishlist', component: WishlistComponent },
  // { path: 'orderhistory', component: OrderhistoryComponent },


  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'watch', component: WatchesComponent, canActivate: [AuthGuard] },
  { path: 'brand', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'store', component: StoreComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactUsComponent, canActivate: [AuthGuard] },
  { path: 'watchdetails', component: WatchDetailsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'orderhistory', component: OrderhistoryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
