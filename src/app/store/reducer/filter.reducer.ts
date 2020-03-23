import { Filter } from '../../interface/filter';
import * as filterRef from '../action/filter.action';

export const initialState:Filter = {
    imgUrl:'',
    index: -1,
    title: '',
    showFilter: false
}

export function filterReducer(state:Filter = initialState, action: filterRef.actions): Filter {
      switch (action.type) {
        case filterRef.SELECTED_ITEM:
          return {
            imgUrl: state.imgUrl,
            title: state.title,
            index: action.payload,
            showFilter: state.showFilter          
          };
          case filterRef.OPEN_FILTER_OPTIONS:
           return{
            imgUrl: state.imgUrl,
            title: state.title,
            index: state.index,
            showFilter: action.payload
           }
        default:
        return { ...state};    
      }
}  