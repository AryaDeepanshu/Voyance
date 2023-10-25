const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { generateAccessToken } = require("../config/JWT_auth");
const jwt = require("jsonwebtoken");

// Register:
module.exports.register = async (req, res) => {
  const credentials = req.body;

  try {
    const alreadyExist = User.findOne({ email: credentials.email });
    if (alreadyExist) return res.status(403).json();
  } catch (err) {
    return res.status(500).json(err);
  }

  const user_created = new User({
    ...credentials,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    await user_created.save();
    const user = await User.findOne({ email: credentials.email });

    /* Generate Access Token and Refresh Token: */
    const accessToken = generateAccessToken(user);

    /* Donot send password along with user detials: */
    const { password, ...userDetails } = user._doc;

    /* Return the required data */
    return res
      .cookie("accessToken", accessToken, {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send(userDetails);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Login:
module.exports.login = async (req, res) => {
  const credentials = req.body;
  const user = await User.findOne({ email: credentials.email }).populate({
    path: "wishlist",
  });

  /* No matching user found: */
  if (!user)
    return res.status(401).send("Invalid Username/Password, Try Again!");

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASSWORD_SECRET
  );

  const Password = hashedPassword.toString(CryptoJS.enc.Utf8);

  /* Invalid Password: */
  if (Password != credentials.password)
    return res.status(401).send("Invalid Username/Password, Try Again!");

  /* Matching user found: -> Generate Access Token and Refresh Token: */
  const accessToken = generateAccessToken(user);

  /* Donot send password along with user detials: */
  const { password, ...userDetails } = user._doc;

  /* Return the required data */
  return res
    .cookie("accessToken", accessToken, {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send(userDetails);
};

// Google:
module.exports.google = async (req, res) => {
  const credentials = req.body;
  const user = await User.findOne({ email: credentials.email }).populate({
    path: "wishlist",
  });

  // No user found with provided Email, Create new user:
  if (!user) {
    const user_created = new User({
      ...credentials,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString(),
    });

    try {
      await user_created.save();
      const user = await User.findOne({ email: credentials.email });

      /* Generate Access Token and Refresh Token: */
      const accessToken = generateAccessToken(user);

      /* Donot send password along with user detials: */
      const { password, ...userDetails } = user._doc;

      /* Return the required data */
      return res
        .cookie("accessToken", accessToken, {
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .send(userDetails);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // user already exists:
  else {
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );

    const Password = hashedPassword.toString(CryptoJS.enc.Utf8);

    /* Invalid Password: */
    if (Password != credentials.password)
      return res.status(401).send("Invalid Username/Password, Try Again!");

    /* Matching user found: -> Generate Access Token and Refresh Token: */
    const accessToken = generateAccessToken(user);

    /* Donot send password along with user detials: */
    const { password, ...userDetails } = user._doc;

    /* Return the required data */
    return res
      .cookie("accessToken", accessToken, {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send(userDetails);
  }
};

// Logout:
module.exports.logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("You logged out successfully.");
};
