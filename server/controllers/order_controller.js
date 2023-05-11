const Order = require("../models/Order");

module.exports.add = async (req, res) => {
  const orderDetail = req.body;
  const hotel = new Order(orderDetail);

  try {
    const orderAdded = await hotel.save();
    return res.status(200).json(orderAdded.data);
  } catch (Err) {
    return res.status(401).json(`can't Add Order: ${Err}`);
  }
};

module.exports.getOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.find({ user: id }).populate("hotel");
    return res.status(200).json(order);
  } catch (Err) {
    return res.status(500).json(`Can't Fetch Order: ${Err}`);
  }
};
