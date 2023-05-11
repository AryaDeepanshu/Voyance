const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports.checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
};

module.exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  var crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    const order_details = await instance.orders.fetch(razorpay_order_id);
    const paymentDetails = await Payment.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      order_details,
    });

    console.log(paymentDetails._id);

    return res.status(200).json(paymentDetails._id);
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
