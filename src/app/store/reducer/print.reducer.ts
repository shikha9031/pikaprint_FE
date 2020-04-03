import { Print } from '../../interface/print';
import * as printRef from '../action/print.action';


export const initialState:Print = {
    imgUrl:'',
    printFrameURl: '',
    title: '',
    showPrintOptions: false
}

export function printReducer(state:Print = initialState, action: printRef.actions): Print {
    switch (action.type) {
        case printRef.PRINT_OPTIONS_OPEN:
          return {
            imgUrl: state.imgUrl,
            title: state.title,
            printFrameURl: state.printFrameURl,
            showPrintOptions: action.payload          
          };
        case printRef.SELECTED_PRINT:
         return {
          imgUrl: state.imgUrl,
          title: state.title,
          printFrameURl: '/assets/image/canvas.svg',
          showPrintOptions: state.showPrintOptions  
         }
         case printRef.SELECTED_PICTURE:
         return {
          imgUrl: action.payload,
          title: state.title,
          printFrameURl: state.printFrameURl,
          showPrintOptions: state.showPrintOptions  
         }
        default:
          return { ...state};   
    }    
}