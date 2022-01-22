import mongoose from "mongoose";

const user_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("User", user_schema);
