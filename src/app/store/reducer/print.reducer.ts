import { Print } from '../../interface/print';
import * as printRef from '../action/print.action';

export const initialState:Print = {
    imgUrl:'',
    index: -1,
    title: '',
    showPrintOptions: false
}

export function printReducer(state:Print = initialState, action: printRef.actions): Print {
    switch (action.type) {
        case printRef.PRINT_OPTIONS_OPEN:
          return {
            imgUrl: state.imgUrl,
            title: state.title,
            index: state.index,
            showPrintOptions: action.payload          
          };
        default:
          return { ...state};   
    }    
}