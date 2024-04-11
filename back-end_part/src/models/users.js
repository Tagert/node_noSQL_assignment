import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  createdDate: { type: Date },
  fullName: { type: String, required: true, min: 3 },
  email: { type: String, required: true, min: 3 },
  password: { type: String, required: true, min: 3 },
  carts: { type: Array },
});

const UserModel = mongoose.model("user", userSchema);

export { UserModel };
