import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';


export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartCounter = createSelector(
  selectCartState,
  (state: CartState) => state.counter
);
