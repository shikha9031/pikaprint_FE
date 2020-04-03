import * as imgUploadRef from '../action/image.action';
import { UploadImage } from '../../interface/img';

export const initialState:UploadImage = {
    openTab: true
}

export function imgReducer(state:UploadImage = initialState, action: imgUploadRef.actions): UploadImage {
    switch (action.type) {
        case imgUploadRef.IMAGE_TAB_CLICK:
          return {
            openTab: action.payload          
          };
        default:
          return { ...state};   
    }    
}