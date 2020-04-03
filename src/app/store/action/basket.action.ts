import { Action } from '@ngrx/store';
import { Basket } from '../../interface/basket';

export const OPEN_CART = 'open-cart';


export class OpenCart implements Action {
    readonly type = OPEN_CART;
    constructor(public payload: boolean) {}
  }

  export type actions = OpenCart;
  