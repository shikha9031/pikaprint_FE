import * as commonRef from '../action/common.action';

export const initialState = {
    isMenuOpen:true
}
if(window.location.pathname == '/about-us') initialState.isMenuOpen = false;

export function commonReducer(state = initialState, action: commonRef.actions):any {
    switch (action.type) {
      case commonRef.MENU_OPEN:
        return {
            isMenuOpen: action.payload
        };
      default:
      return { ...state};    
    }
} 