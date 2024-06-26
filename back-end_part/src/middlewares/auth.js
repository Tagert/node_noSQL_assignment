import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const jw_token = req.headers.authorization;

  if (!jw_token) {
    return res.status(401).json({ message: "User has not been authenticated" });
  }

  jwt.verify(jw_token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "User has not been authenticated" });
    }

    console.log("test");

    req.body.userId = decoded.user_id;

    return next();
  });
};

export default authUser;
