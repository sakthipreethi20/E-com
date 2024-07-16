import { createAction, props } from '@ngrx/store';
import { Watch } from '../Datatype'; // Assuming you have a 'Watch' interface defined

export const addToCart = createAction('[Cart] Add To Cart', props<{ watch: Watch }>());
export const deleteFromCart = createAction('[Cart] Delete From Cart', props<{ id: number }>());
export const incrementCounter = createAction('[Cart] Increment Counter');

export const incrementQuantity = createAction('[Counter] Increment', props<{ id: number }>());
export const decrementQuantity = createAction('[Counter] Decrement', props<{ id: number }>());

export const resetCounter = createAction('[Cart] Reset Counter');