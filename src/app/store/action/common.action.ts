import { Action } from '@ngrx/store';

export const MENU_OPEN = 'menu-open';

export class isMenuOpen implements Action {
    readonly type = MENU_OPEN;
    constructor(public payload: boolean) {}
  }

  export type actions = isMenuOpen ;
  