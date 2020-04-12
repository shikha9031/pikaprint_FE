import { Action } from '@ngrx/store';

export const OPEN_SIDE_MENU = "open-side-menu";

export class OpenSideMenu implements Action {
    readonly type = OPEN_SIDE_MENU;
    constructor(public payload: boolean) {}    
}

export type actions = OpenSideMenu;


