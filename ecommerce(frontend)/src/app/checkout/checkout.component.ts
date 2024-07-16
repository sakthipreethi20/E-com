import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, Watch } from '../Datatype';
import { WatchService } from '../services/watch.service';
import { Store, select } from '@ngrx/store';
import { CartState } from '../ngrxStore/cart.reducer';
import { Observable } from 'rxjs';
import { resetCounter } from '../ngrxStore/cart.actions';
import { CartService } from '../services/cart.service';
import { OrderHistoryService } from '../services/orderhistory.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  shippingAddressForm!: FormGroup;
  paymentMethodForm!: FormGroup;
  couponForm!: FormGroup;
  items: Watch[] = [];
  totalPrice: number = 0;
  couponCode: string = '';
  couponPrice: number = 0;
  coupon: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private watchService: WatchService,
    private store: Store,
    private cartService: CartService,
    private orderhistory: OrderHistoryService
  ) {}

  ngOnInit(): void {
    // Initialize forms
    this.checkOutForms();
    this.applyCoupon();
    // Retrieve items and total price from query params
    this.route.queryParams.subscribe((params) => {
      if (params && params['items'] && params['totalPrice']) {
        this.items = JSON.parse(params['items']);

        this.totalPrice = parseFloat(params['totalPrice']);
        console.log('checkout cartItems:', this.items);
        console.log('Total Price:', this.totalPrice);
      }
    });

    // Retrieve selected watch for Buy Now
    const buyNowWatch = this.watchService.getSelectedWatch();
    console.log(buyNowWatch, 'BuyNow Watches');

    if (buyNowWatch) {
      // Check if the item is already in the cart
      const existingItemIndex = this.items.findIndex(
        (item) => item.id === buyNowWatch.id
      );
      if (existingItemIndex === -1) {
        // Add the selected watch to the items array
        this.items.push({
          name: buyNowWatch.brand,
          dialColor: '',
          strapMaterial: '',
          price: buyNowWatch.price,
          quantity: 1,
          imageUrl: buyNowWatch.imageUrl,
          brand: '',
          id: buyNowWatch.id,
        });

        this.totalPrice += parseFloat(buyNowWatch.price);
      }
    }
  }

  checkOutForms(): void {
    // Initialize shipping address form with form controls and validation
    this.shippingAddressForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],

      zipCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      couponCode: [''],
    });

    // Initialize payment method form with form controls and validation
    this.paymentMethodForm = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      creditCardNumber: [''],
      expirationDate: [''],
      cvv: [''],
      debitCardNumber: [''],
      upi: [''],
      couponCode: [''],
    });

    // Set up dynamic validation for payment method selection
    this.paymentMethodForm
      .get('paymentMethod')
      ?.valueChanges.subscribe((value) => {
        const creditCardNumberControl =
          this.paymentMethodForm.get('creditCardNumber');
        const expirationDateControl =
          this.paymentMethodForm.get('expirationDate');
        const cvvControl = this.paymentMethodForm.get('cvv');
        const debitCardNumberControl =
          this.paymentMethodForm.get('debitCardNumber');
        const upiControl = this.paymentMethodForm.get('upi');

        // Reset all validators
        creditCardNumberControl?.clearValidators();
        expirationDateControl?.clearValidators();
        cvvControl?.clearValidators();
        debitCardNumberControl?.clearValidators();
        upiControl?.clearValidators();

        if (value === 'credit card') {
          // Set validation for credit card
          creditCardNumberControl?.setValidators([
            Validators.required,
            Validators.pattern('[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}'),
          ]);
          expirationDateControl?.setValidators(Validators.required);
          cvvControl?.setValidators([
            Validators.required,
            Validators.pattern('[0-9]{3}'),
          ]);
        } else if (value === 'debit card') {
          // Set validation for debit card
          debitCardNumberControl?.setValidators([
            Validators.required,
            Validators.pattern('[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}'),
          ]);
          expirationDateControl?.setValidators(Validators.required);
          cvvControl?.setValidators([
            Validators.required,
            Validators.pattern('[0-9]{3}'),
          ]);
        } else if (value === 'upi') {
          // Set validation for UPI
          upiControl?.setValidators(Validators.required);
        }

        // Update validation
        creditCardNumberControl?.updateValueAndValidity();
        expirationDateControl?.updateValueAndValidity();
        cvvControl?.updateValueAndValidity();
        debitCardNumberControl?.updateValueAndValidity();
        upiControl?.updateValueAndValidity();
      });

    this.couponForm = this.formBuilder.group({
      couponCode: [''],
    });
  }

  concatenateShippingAddress(): string {
    const { name, address, phoneNumber, zipCode } =
      this.shippingAddressForm.value;
    return `${name}, ${address}, ${phoneNumber}, ${zipCode}`;
  }

  // Method to handle placing the order
  placeOrder(): void {
    // Implement order placement logic here
    console.log('Shipping Address:', this.shippingAddressForm.value);
    console.log('Payment Method:', this.paymentMethodForm.value);
    this.snackBar.open('Order placed successfully!', 'Close', {
      duration: 3000,
    });

    // Store order details
    // this.cartService.storeOrderDetails(this.items);

    // Declare the order variable
    let order: Order;

    // Create an order object using the form values
    order = {
      id: 0, // Set the id appropriately if needed

      items: this.items,
      totalPrice: this.totalPrice,
      shippingAddress: this.concatenateShippingAddress(),
    };

    this.orderhistory.placeOrder(order).subscribe(
      () => {
        // Handle success if needed
        console.log('Order placed successfully:', order);
      },
      (error) => {
        // Handle error if needed
        console.error('Error placing order:', error);
      }
    );

    // Reset forms after placing the order
    this.shippingAddressForm.reset();
    this.paymentMethodForm.reset();
    this.store.dispatch(resetCounter());
    this.router.navigate(['home']);
  }

  applyCoupon(): void {
    const couponCode = this.couponForm.get('couponCode')?.value;
    if (couponCode === 'DISCOUNT20') {
      this.couponPrice = this.totalPrice - this.totalPrice * 0.2;
      this.coupon = true;
      console.warn(this.couponPrice);
      console.log('Coupon applied successfully!');
    } else {
      console.log('Invalid coupon code!');
    }
  }
}

