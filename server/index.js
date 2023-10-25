const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");
require("./config/Passport_auth");

const app = express();
dotenv.config();

/* CORS Header: */
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://voyanceapi.azurewebsites.net"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://voyanceapi.azurewebsites.net"],
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
app.use(express.urlencoded({ extended: true }));

// use express router: -> all the request will be handled by the index.js file in the routes folder.
app.use("/", require("./routes/index"));

app.get("/payment/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.listen("5000", () => {
  console.log("The server is up and running on port: 5000");
});

// app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`));
