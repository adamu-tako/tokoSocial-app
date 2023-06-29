import axios from "axios";
// "http://localhost:5000"

const API = axios.create({
  baseURL: "https://dark-gold-cougar-boot.cyclic.app"
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("sydaniForumSession")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("sydaniForumSession") as string).token
    }`;
  }

  req.headers["ngrok-skip-browser-warning"] = 2452;

  return req;
});

export const fetchPost = (id: any) => API.get(`/posts/${id}`);

export const fetchPosts = (page: any) => API.get(`/posts?page=${page}`);

export const fetchPostsByCreator = (name: any) =>
  API.get(`/posts/creator?name=${name}`);

export const fetchPostsBySearch = (searchQuery: any) =>
  API.get(`/posts/search?searchQuery=${searchQuery || ""}`);

export const createPost = (newPost: any) => API.post("/posts", newPost);

export const likePost = (value: any, id: any) =>
  API.patch(`/posts/${id}/likePost`, { value });

export const comment = (value: any, id: any) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const updatePost = (id: any, updatedPost: any) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id: any) => API.delete(`/posts/${id}`);

export const signIn = (formData: any) => API.post("/user/signin", formData);
export const signUp = (formData: any) => API.post("/user/signup", formData);
