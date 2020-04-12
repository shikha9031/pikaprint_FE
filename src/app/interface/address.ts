export interface Address{
    name:string;
    email:string;
    phone_number:string;
    Streetname:string;
    apartment:string;
    building:string;
    floor:string;
    city:string;
    pincode:string;
    country:string;
}
export interface AddressForm  {
    closeAddForm:boolean;
    addFormObj:Address
}