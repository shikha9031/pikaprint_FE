import * as addressRef from '../action/address.action';
import { AddressForm, Address } from '../../interface/address';

export const addressObj: Address = {
    apartment:'',
    building:'',
    city:'',
    country:'',
    email:'',
    firstname:'',
    floor:'',
    phone_number:'',
    pincode:'',
    Streetname:''
}
export const initialState:AddressForm = {
    closeAddForm:true,
    addFormObj: addressObj
}

export function addressReducer(state = initialState, action: addressRef.actions):AddressForm {
    switch (action.type) {
      case addressRef.CLOSE_ADDRESS:
        return {
            closeAddForm: action.payload, 
            addFormObj: state.addFormObj     
        };
        case addressRef.ADDRESS_FORM_DATA:
        return {
            closeAddForm: state.closeAddForm,
            addFormObj: action.payload       
        };
      default:
      return { ...state};    
    }
} 