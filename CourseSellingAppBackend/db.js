const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

//  Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

//  Admin Schema
const adminSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

//  Course Schema
const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "admin", required: true },
  },
  { timestamps: true }
);

// Purchase Schema
const purchaseSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
  },
  { timestamps: true }
);

//Models
export const userModel = mongoose.model("User", userSchema);
export const adminModel = mongoose.model("Admin", adminSchema);
export const courseModel = mongoose.model("Course", courseSchema);
export const purchaseModel = mongoose.model("Purchase", purchaseSchema);


