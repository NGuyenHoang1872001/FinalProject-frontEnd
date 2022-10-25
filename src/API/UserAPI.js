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

const handleGetOwnerStore = async (ownerId) => {
  try {
    const URL = `http://localhost:3001/routerAPI/getOwnerStore/${ownerId}`;
    const getOwnerStore = await axios.get(URL);
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 71 ~ handleGetOwnerStore ~ getOwnerStore",
      getOwnerStore
    );
    return getOwnerStore;
  } catch (error) {}
};

const handleCreateStore = async (payload) => {
  try {
    const URL = `http://localhost:3001/routerAPI/createStore`;
    const response = await axios.post(URL, payload);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 80 ~ handleCreateStore ~ error",
      error
    );
  }
};
const handleUpdateStore = async (payload, storeId) => {
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 87 ~ handleUpdateStore ~ payload",
    payload
  );
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 87 ~ handleUpdateStore ~ storeId",
    storeId
  );
  try {
    const URL = `http://localhost:3001/routerAPI/updateStore/${storeId}`;
    const response = axios.put(URL, payload);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 99 ~ handleUpdateStore ~ error",
      error
    );
  }
};

const handleDeleteStore = async (storeId) => {
  try {
    const URL = `http://localhost:3001/routerAPI/deleteStore/${storeId}`;
    const response = await axios.delete(URL);
  } catch (error) {}
};

const handleCreateProduct = async (payload) => {
  try {
    const URL = `http://localhost:3001/routerAPI/createProduct`;
    const response = await axios.post(URL, payload);
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 121 ~ handleCreateProduct ~ payload",
      payload
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 118 ~ handleCreateProduct ~ error",
      error
    );
  }
};

const handleUpdateProduct = async (payload, productId) => {
  try {
    const URL = `http://localhost:3001/routerAPI/updateProduct/${productId}`;
    const response = await axios.put(URL, payload);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 130 ~ handleUpdateProduct ~ error",
      error
    );
  }
};
const handleDeleteProduct = async (productId) => {
  try {
    const URL = `http://localhost:3001/routerAPI/deleteProduct/${productId}`;
    const response = await axios.delete(URL);
  } catch (error) {}
};

const handleGetDetailUser = async (userId) => {
  try {
    const URl = `http://localhost:3001/routerAPI/getDetailUser/${userId}`;
    const response = await axios.get(URl);
    return response;
  } catch (error) {}
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
  handleGetOwnerStore,
  handleCreateStore,
  handleUpdateStore,
  handleDeleteStore,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetDetailUser,
};
