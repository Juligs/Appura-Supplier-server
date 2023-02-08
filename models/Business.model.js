const { Schema, model } = require("mongoose");

const businessSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
    },

    decription: {
      type: String,
      default: "Default Description",
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number],
    },
    businessImg: {
      type: String,
      default:
        "https://www.bedfordcentre.com/plugins/noveldesign-store-directory/images/default-shop.jpg",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    productList: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },

    rating: {
      type: Array,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

businessSchema.index({ location: "2dsphere" });

const Business = model("Business", businessSchema);

module.exports = Business;
