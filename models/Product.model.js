const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },

  decription: {
    type: String,
    default: "Default Description",
  },

  business: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },

  productImg: {
    type: String,
    default:
      "https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1",
  },

  inventory: {
    type: Number,
  },

  categories: {
    type: String,
    enum: [
      "Frozen",
      "Canned Goods",
      "Vegetables and fruit",
      "Condiments & Spices",
      "Cereal",
      "Paper & Wrap",
      "Garendening",
      "Diary",
      "Meat & Fish",
      "Cleaning Supplies",
      "Alcoholic Beverages",
      "Baking Goods",
      "Stationery",
      "Construction Supplies",
      "Kitchen Supplies",
      "Appliances",
      "Linens",
      "General",
    ],
    default: "General",
  },

  pricePerUnit: {
    type: Number,
    min: 0,
    required: [true, "Please enter a correct price"],
  },
  unit: {
    enum: ["Ounces", "Pounds", "tons", "uq"],
  },
  minQuantity: {
    type: Number,
    required: true,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
