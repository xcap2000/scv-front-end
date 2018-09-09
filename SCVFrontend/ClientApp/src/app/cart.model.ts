import { CartItemModel } from "./cart-item.model";

export interface CartModel {
  id: string;
  total: string;
  CartItems: CartItemModel[]
}