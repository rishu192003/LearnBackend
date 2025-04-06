import express from "express";
const adminRouter = express.Router();
import { adminModel, courseModel } from "../db.js";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import { JWT_ADMIN_PASSWORD } from "../config.js";
import adminMiddleware from "../middlewares/admin";

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    await adminModel.create({
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

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await adminModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_ADMIN_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "give correct id/password",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  //create course
  const adminId = req.userId;
  const { title, description, imageUrl, price } = req.body;

  await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });
  res.json({
    message: "course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  //update course
  const adminId = req.userId;
  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );
  res.json({
    message: "course updated",
    course: courseId,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  //see course
  const adminId = req.userId;
  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "list of courses",
    courses,
  });
});

export default adminRouter;
