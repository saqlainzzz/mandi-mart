import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    fruitName: {
      type: String,
      required: true,
    },

    pricePerKg: {
      type: Number,
      required: true,
    },

    targetKg: {
      type: Number,
      required: true,
    },

    currentKg: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Campaign ||
  mongoose.model("Campaign", CampaignSchema);
