const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Products: [
      {
        _id: false,
        itemdetail: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    count:{
      type:Array,
      required:true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    orderAmount: {
      type: Number,
      required: true,
    },
    DeliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema);
