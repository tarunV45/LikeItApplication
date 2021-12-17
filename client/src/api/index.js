import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPost = () => {
  return axios.get(url); // or in this way, return must be mentioned explicitly
};

export const createPost = (newPost) => axios.post(url, newPost); //should return proimise as react would be expecting it

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
