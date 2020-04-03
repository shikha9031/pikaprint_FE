import { Action } from '@ngrx/store';
import { Address } from '../../interface/address';

export const CLOSE_ADDRESS = 'close-address';
export const ADDRESS_FORM_DATA = 'address-form-data';

export class CloseAddress implements Action {
    readonly type = CLOSE_ADDRESS;
    constructor(public payload: boolean) {}
  }

  export class AddressFormData implements Action {
    readonly type = ADDRESS_FORM_DATA;
    constructor(public payload: Address) {}
  }

  export type actions = CloseAddress | AddressFormData;
  