import { CartType } from "./cart.types";

export class Cart {
  date?: Date;
  userEmail: string;
  id?: string;

  constructor({ userEmail }: CartType) {
    this.userEmail = userEmail;
  }
}
