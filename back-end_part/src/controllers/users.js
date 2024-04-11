import { UserModel } from "../models/users.js";
import bcrypt from "bcrypt";

const SIGN_UP = async (req, res) => {
  try {
    const lithuanianDate = new Date().toLocaleString("lt-LT");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new UserModel({
      createdDate: lithuanianDate,
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      carts: [],
    });
    user.id = user._id.toString();

    // const user = new UserModel(userData);
    const response = await user.save();

    return res.status(201).json({ response: response });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { SIGN_UP };
