const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");
require("./config/Passport_auth");

const app = express();

app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Successfully Connection to the MongoDB Database."))
  .catch((error) => console.log(error));

app.use(express.json()); // -> allows the app to take json as post request input.

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
// use express router: -> all the request will be handled by the index.js file in the routes folder.
app.use("/", require("./routes/index"));

app.get("/payment/getkey", (req,res) =>
  res.status(200).json({key: process.env.RAZORPAY_API_KEY})
);

app.listen("5000", () => {
  console.log("The server is up and running on port: 5000");
});

app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`));
