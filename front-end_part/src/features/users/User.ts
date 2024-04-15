import { CartType } from "../carts/cart.types";
import { UserType } from "./user.types";

export class User {
  fullName?: string;
  email: string;
  password: string;
  carts?: CartType[];

  constructor({ fullName, email, password, carts }: UserType) {
    this.fullName = fullName || "";
    this.email = email;
    this.password = password;
    this.carts = carts || [];
  }
}
