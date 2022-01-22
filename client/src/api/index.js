import axios from "axios";

const API = axios.create({baseURL:'http://localhost:5000'});

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPost = () => {
  return API.get('/posts'); // or in this way, return must be mentioned explicitly
};

export const createPost = (newPost) => API.post('/posts', newPost); //should return promise as react would be expecting it

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
