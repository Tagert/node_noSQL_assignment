import { UserModel } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const LOG_IN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(500)
        .json({ message: "Unrecognized username or password" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(500)
        .json({ message: "Unrecognized username or password" });
    }

    const jwt_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_KEY,
      { expiresIn: "2h" }
    );

    return res
      .status(201)
      .json({
        jwt: jwt_token,
        status: `User (${user.email}) logged in successfully`,
      });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { SIGN_UP, LOG_IN };
