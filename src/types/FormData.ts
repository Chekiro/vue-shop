export default interface ProductCart {
  name: string;
  companyName: string;
  surname: string;
  phoneNumber: string | number;
  nip: string | number;
  email: string;
  country: string;
  city: string;
  street: string;
  zipCode: string | number;
  clientType: string;
  deliveryType: string;
  creditCard: string;
  emailInvalid: boolean;
  phoneNumberInvalid: boolean;
  zipCodeInvalid: boolean;
  nipInvalid: boolean;
}
