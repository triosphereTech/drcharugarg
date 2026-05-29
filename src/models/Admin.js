
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      trim: true,
      maxlength: 6,
    },

    otpExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Admin =
  mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema);

export default Admin;
