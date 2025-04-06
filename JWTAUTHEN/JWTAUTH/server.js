import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const app = express();
app.use(express.json());
app.use(cors()); 
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

let users = [];

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username)) {
    return res.status(404).json({
      success: false,
      message: "Give another username",
      error: "Username already taken",
    });
  }

  const user = { username, password };
  users.push(user);
  console.log(user);
  res.status(200).json({
    success: true,
    message: "User signed up",
    data: user,
  });
  //Here the password should also be hashed but we will do it later on using bcrypt lib
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username == username && user.password == password
  );
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Please give correct username and password",
      error: "Incorrect Username or Password",
    });
  }
  //normally we give id and username but i will do that in full correct manner later on
  const token = jwt.sign(
    { username: username},
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.status(201).json({
    success: true,
    message: "SignedIn",
    token: token,
  });
});

function auth(req, res, next) {
  // This middleware is used to let you know that you are signed in before using the below routes
  const token = req.headers["token"];

  // Check if the Authorization header is missing
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please sign in first",
      error: "Token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.username = decoded.username;
    req.password = decoded.password;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: err.message, // Return only the error message (not the full error object)
    });
  }
}

app.get("/me", auth, (req, res) => {
  let foundUser = users.find((user) => user.username == req.username);
  if (foundUser) {
    return res.status(201).json({
      success: true,
      message: "User Data Found",
      username: foundUser.username,
      password:foundUser.password
    });
  } else {
    res.status(401).json({
      success: false,
      message: "There is no data of user",
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
