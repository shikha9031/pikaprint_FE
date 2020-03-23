import { Action } from '@ngrx/store';

export const PRINT_OPTIONS_OPEN = 'print-img';

export class PrintImgSectionToggle implements Action {
    readonly type = PRINT_OPTIONS_OPEN;
    constructor(public payload: boolean) {}    
}

export type actions = PrintImgSectionToggle ;
