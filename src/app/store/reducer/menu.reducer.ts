import { Menu } from '../../interface/menu';
import * as menuRef from '../action/menu.action';

export const initialState:Menu = {
    openSideMenu: false
}

export function menuReducer(state:Menu = initialState, action: menuRef.actions): Menu {
    switch (action.type) {
        case menuRef.OPEN_SIDE_MENU:
          return {
            openSideMenu: action.payload          
          };
        default:
          return { ...state};   
    }    
}

