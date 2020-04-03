import { Action } from '@ngrx/store';

export const PRINT_OPTIONS_OPEN = 'print-img';
export const SELECTED_PRINT = "print-selected-index";
export const SELECTED_PICTURE = "picture-selected";

export class PrintImgSectionToggle implements Action {
    readonly type = PRINT_OPTIONS_OPEN;
    constructor(public payload: boolean) {}    
}
export class SelectedPrintType implements Action {
    readonly type = SELECTED_PRINT;
    constructor(public payload: string) {}    
}
export class PrintImg implements Action {
    readonly type = SELECTED_PICTURE;
    constructor(public payload: string) {}    
}

export type actions = PrintImgSectionToggle | SelectedPrintType | PrintImg;
