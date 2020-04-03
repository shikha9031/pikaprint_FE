import * as cartRef from '../action/basket.action';
import { Basket } from '../../interface/basket';

export const initialState:Basket = {
    openBasket: false
}

export function basketReducer(state = initialState, action: cartRef.actions):Basket {
    switch (action.type) {
      case cartRef.OPEN_CART:
        return {
            openBasket: action.payload
        };
      default:
      return { ...state};    
    }
} 