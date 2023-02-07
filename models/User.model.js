const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "Username is required"],
      unique: true,
      lowercase: true,
      minlengh: [3, "Username must have at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },

    role: {
      type: String,
      enum: ["USER", "OWNER", "ADMIN"],
      default: "USER",
    },

    bio: {
      type: String,
    },

    profileImg: {
      type: String,
      default:
        "https://i.pinimg.com/736x/3d/cd/4a/3dcd4af5bc9e06d36305984730ab7888.jpg",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
