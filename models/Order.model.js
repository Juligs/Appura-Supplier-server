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

  shippingCost: {
    type: Number,
  },

  paymentMethod: {
    enum: ["Credit_Card", "Cash", "PayPal"],
  },

  ammountToPay: {
    type: Number,
    min: 0,
  },

  status: {
    type: String,
    enum: ["Pending", "delivered", "shipped", "canceled"],
    default: "Pending",
  },

  purchaseDate: {
    type: Date,
  },

  estimatedDeliveryDate: {
    type: Date,
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
