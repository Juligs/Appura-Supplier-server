const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  shop: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },

  destination: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  total: {
    type: Number,
  },
  shippingCost: {
    type: Number,
  },

  paymentMethod: {
    enum: ["Credit Card", "Cash", "PayPal"],
  },

  ammountToPay: {
    type: number,
  },

  status: {
    enum: ["pending", "delivered", "shipped", "canceled"],
    default: "pending",
  },

  date: {
    type: Date,
    default: Date.now,
  },

  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

orderSchema.index({ location: "2dsphere" });

const Order = model("Order", orderSchema);

module.exports = Order;
