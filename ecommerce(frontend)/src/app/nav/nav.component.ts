import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCounter } from '../ngrxStore/cart.selector';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  userName: string | null = null;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  cartCounter$: Observable<number> | undefined;

  constructor(private dialog: MatDialog,
    private store:Store,
    private loginservice:LoginService,
  private route:Router) {
      this.cartCounter$ = this.store.pipe(select(selectCartCounter));
    }

ngOnInit(): void {
  this.loginservice.userName$.subscribe(userName => {
    this.userName = userName;
  });
}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '300px', // Adjust the width as needed
      // other dialog configuration options
    });
  }
  
  logOut(){
    this.loginservice.loggedIn=false;
    this.userName=" ";
    this.route.navigate(['/'])
  }

 

  toggleSidenav(sidenavName: string): void {
    if (sidenavName === 'orderHistory') {
      this.sidenav.toggle();
    }
    else {
      // Close the side navigation
      this.sidenav.close();
    }
  }

}
