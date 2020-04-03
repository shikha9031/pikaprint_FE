import { Action } from '@ngrx/store';

export const IMAGE_TAB_CLICK = 'img-upload-tab-open';

export class ImgTabOpen implements Action {
    readonly type = IMAGE_TAB_CLICK;
    constructor(public payload: boolean) {}    
}

export type actions = ImgTabOpen ;
