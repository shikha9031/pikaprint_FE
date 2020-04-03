import { Action } from '@ngrx/store';

export const CHECKOUT_FORM_CLOSE = 'checkout-form-close';

export class CheckoutFormClose implements Action {
    readonly type = CHECKOUT_FORM_CLOSE;
    constructor(public payload: boolean) {}
  }

  export type actions = CheckoutFormClose ;
  