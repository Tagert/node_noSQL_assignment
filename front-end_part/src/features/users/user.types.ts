import { CartType } from "../carts/cart.types";

export type UserType = {
  fullName?: string;
  email: string;
  password: string;
  carts?: CartType[];
  id?: string;
  userId?: string;
};
