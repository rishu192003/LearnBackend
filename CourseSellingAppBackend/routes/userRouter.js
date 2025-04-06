import express from "express";
const userRouter = express.Router();
import { userModel } from "../db.js";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import { JWT_USER_PASSWORD } from "../config.js";
import userMiddleware from "../middlewares/user.js";

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      message: "signup succeeded",
    });
  } catch {
    console.log("There is an error");
  }
});
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "give coorect id/password",
    });
  }
});


userRouter.get("/purchases",userMiddleware ,(req, res) => {
  res.json({
    //courses purchased
    message: "purchases endpoint",
  });
});

export default userRouter;
