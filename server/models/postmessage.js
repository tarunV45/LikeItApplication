import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  user: String,
  tags: [String],
  selctedPic: String,
  likes: {
    type: Number,
    default: 0,
  },
  createdTime: {
    type: Date,
    default: new Date(),
  },
});

const postmsg = mongoose.model("postmsg", postSchema);

export default postmsg;
