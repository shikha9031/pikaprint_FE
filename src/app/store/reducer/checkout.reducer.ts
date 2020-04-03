import * as checkoutRef from '../action/checkout.action';
import { Checkout } from '../../interface/checkout';

export const initialState:Checkout = {
    closeCheckoutPage: false
}

export function checkoutReducer(state = initialState, action: checkoutRef.actions):Checkout {
    switch (action.type) {
      case checkoutRef.CHECKOUT_FORM_CLOSE:
        return {
            closeCheckoutPage: action.payload
        };
      default:
      return { ...state};    
    }
} 