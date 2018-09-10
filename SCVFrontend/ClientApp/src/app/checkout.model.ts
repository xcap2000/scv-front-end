export interface CheckoutModel {
  cartId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  creditCardNumber: string;
  verificationNumber: string;
}