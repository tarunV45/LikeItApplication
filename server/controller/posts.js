import postmsg from "../models/postmessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  //res.send("Welcome");
  try {
    const postMsg = await postmsg.find();
    res.status(200).json(postMsg);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  //res.send("Created Successfully!");
  const post = req.body;
  const newPost = new postmsg({...post, user: req.userId, createdTime: new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  }
  const updatedPost = await postmsg.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }
  await postmsg.findByIdAndDelete(id);
  res.status(200).json({ msg: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) return res.json({message: "Unathenticated!"});

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  const post = await postmsg.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if(index === -1){
    post.likes.push(req.userId);
  } else{
    post.likes = post.likes.filter((id)=>id != String(req.userId));
  }

  const likedPost = await postmsg.findByIdAndUpdate(
    id,
    post,
    { new: true }
  );

  res.status(200).json(likedPost);
};
