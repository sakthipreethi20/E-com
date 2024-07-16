import { createReducer, on } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { Watch } from '../Datatype';
import {  resetCounter } from './cart.actions';

export interface CartState {
  items: Watch[];
  counter: number;
  quantityCount: number;
}

export const initialState: CartState = {
  items: [],
  counter: 0,
  quantityCount: 1,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { watch }) => ({
    ...state,
    items: [...state.items, { ...watch, quantity: 1 }],
    counter: state.counter + 1,
  })),

  on(CartActions.deleteFromCart, (state, { id }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== id),
    counter: state.counter - 1, // Remove item from items array
  })),

  
  on(CartActions.incrementQuantity, (state, { id }) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 }; // Increment quantity for the specific item
      }
      return item;
    }),
  })),
  
  on(CartActions.decrementQuantity, (state, { id }) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 }; // Decrement quantity for the specific item (if greater than 1)
      }
      return item;
    }),
  })),

  on(resetCounter, () => ({
    ...initialState,
    counter: 0
  }))

);
