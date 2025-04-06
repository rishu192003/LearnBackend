import express from "express";
const courseRouter = express.Router();

courseRouter.get("/preview", (req, res) => {
  res.json({ message: "All courses" });
});

courseRouter.get("/purchase", (req, res) => {
  //expect user to purchase course
  res.json({ message: "user is going to purchase this course" });
});

export default courseRouter;
