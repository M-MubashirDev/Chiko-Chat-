import mongoose from "mongoose";

const PersonalChatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date().toISOString(), // Explicitly store in UTC
  },
});

const PersonalChat = mongoose.model("PersonalChat", PersonalChatSchema);
export default PersonalChat;