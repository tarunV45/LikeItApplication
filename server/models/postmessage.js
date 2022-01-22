import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  user: String,
  Name: String,
  tags: [String],
  selectedPic: String,
  likes: {
    type: [String],
    default: [],
  },
  createdTime: {
    type: Date,
    default: new Date(),
  },
});

const postmsg = mongoose.model("postmsg", postSchema);

export default postmsg;
