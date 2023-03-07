const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
