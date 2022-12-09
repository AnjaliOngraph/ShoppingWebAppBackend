const Orders = require("../models/orderSchema");

exports.createOrder = async (req, res) => {
  try {
    const { id } = req.user;
    let details = req.body;
    details.userId = id;

    const Order = await Orders.create(details);
    
    res.status(201).json(Order);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getOrder = async (req, res) => {
  const { id } = req.user;
  try {
    const Order = await Orders.find({ userId: id })
      .populate({ path: "userId", select: "first_name email -_id" })
      .populate({
        path: "Products",
        populate: {
          path: "itemdetail",
        },
      })
      .populate({ path: "DeliveryAddress", select: "-_id" });
    res.status(201).json(Order);
  } catch (error) {
    res.status(400).json(error);
  }
};
