import express from "express";

import { SIGN_UP } from "../controllers/users.js";

const router = express.Router();

router.post("/users", SIGN_UP);

export default router;
