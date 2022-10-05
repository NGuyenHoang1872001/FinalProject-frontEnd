import axios, { Axios } from "axios";

const handleRegisterUser = async (data) => {
  const URL = "http://localhost:3001/routerAPI/register";
  const dataUser = data;
  const createUser = await axios.post(URL, dataUser);
};

const handleLoginUser = async (data) => {
  const URL = "http://localhost:3001/routerAPI/login";
  const dataUser = data;
  const token = await axios.post(URL, dataUser);
  return token;
};

const handleGetAllPost = async () => {
  const URL = "http://localhost:3001/routerAPI/getPost";
  const getData = await axios.get(URL);
  return getData;
};

const handleGetStore = async (storeId) => {
  const URL = `http://localhost:3001/routerAPI/getOneStore/${storeId}`;
  const getStore = await axios.get(URL);
  return getStore;
};

const handleGetProductStore = async (storeId) => {
  const URL = `http://localhost:3001/routerAPI/productInStore/${storeId}`;
  const getProduct = await axios.get(URL);
  return getProduct;
};

const handleCreatePost = async (payload) => {
  const URl = `http://localhost:3001/routerAPI/createPost`;
  const createPost = await axios.post(URl, payload);
  return createPost;
};

const handleDeletePost = async (post) => {
  const postId = post;
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 42 ~ handleDeletePost ~ postId",
    postId
  );

  const URL = `http://localhost:3001/routerAPI/deletePost/${postId}`;
  const deletePost = await axios.delete(URL);
};

const handleGetOnePost = async (postId) => {
  const getPostId = postId;
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 52 ~ handleGetOnePost ~ getPostId",
    getPostId
  );
  const URL = `http://localhost:3001/routerAPI/getOnePost/${getPostId}`;
  const getOnePost = await axios.get(URL);
  return getOnePost.data;
};

const handleUpdatePost = async (payload, postId) => {
  const URL = `http://localhost:3001/routerAPI/updatePost/${postId}`;
  const updatePost = await axios.put(URL, payload);
};
export {
  handleRegisterUser,
  handleLoginUser,
  handleGetAllPost,
  handleGetStore,
  handleGetProductStore,
  handleCreatePost,
  handleDeletePost,
  handleGetOnePost,
  handleUpdatePost,
};
