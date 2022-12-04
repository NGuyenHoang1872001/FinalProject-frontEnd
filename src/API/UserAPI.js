import axios, { Axios } from "axios";
import { comment } from "postcss";
import { handleFollowing, handleUnFollowing } from "./UserAPIFollowing";

const handleRegisterUser = async (data) => {
  try {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 6 ~ handleRegisterUser ~ data",
      data
    );
    const URL = "http://localhost:3001/routerAPI/register";
    const dataUser = data;
    const createUser = await axios.post(URL, dataUser);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 11 ~ handleRegisterUser ~ error",
      error
    );
  }
};

const handleLoginUser = async (payload) => {
  console.log("🚀 ~ file: UserAPI.js:23 ~ handleLoginUser ~ payload", payload);
  try {
    const URL = "http://localhost:3001/routerAPI/login";

    // console.log(
    //   "🚀 ~ file: UserAPI.js:25 ~ handleLoginUser ~ dataUser",
    //   dataUser
    // );
    const token = await axios.post(URL, payload);
    return token;
  } catch (error) {
    console.log("🚀 ~ file: UserAPI.js:33 ~ handleLoginUser ~ error", error);
  }
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

const handleGetPostByAuthor = async (authorId) => {
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 65 ~ handleGetPostByAuthor ~ authorId",
    authorId
  );
  const URl = `http://localhost:3001/routerAPI/getPostByAuthor/${authorId}`;
  const getPost = await axios.get(URl);
  return getPost.data;
};

const handleUpdatePost = async (postId, payload) => {
  console.log("hello", payload);
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

const handleUpdateProduct = async (productId, payload) => {
  try {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 134 ~ handleUpdateProduct ~ payload",
      payload
    );
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

const handleCreateInvoice = async (payload) => {
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 160 ~ handleCreateInvoice ~ payload",
    payload
  );
  const URl = `http://localhost:3001/routerAPI/createInvoice`;
  const createInvoice = await axios.post(URl, payload);
  return createInvoice;
};

const handleUpdateInvoice = async (id, option) => {
  try {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 170 ~ handleUpdateInvoice ~ option",
      option
    );
    const URL = `http://localhost:3001/routerAPI/updateInvoice/${id}`;
    const updateInvoice = await axios.put(URL, option);
  } catch (error) {}
};

const handleGetInvoice = async () => {
  try {
    const URL = `http://localhost:3001/routerAPI/getInvoice`;
    const getInvoice = await axios.get(URL);
    return getInvoice;
  } catch (error) {}
};

const handleGetInvoiceByUser = async (userId) => {
  try {
    const URL = `http://localhost:3001/routerAPI/getInvoiceByAuthor/${userId}`;
    const getInvoiceByUser = await axios.get(URL);
    return getInvoiceByUser;
  } catch (error) {}
};

const handleCreateTransaction = async (payload) => {
  try {
    const URL = `http://localhost:3001/routerAPI/createTransaction`;
    const createTransaction = await axios.post(URL, payload);
    return createTransaction;
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 198 ~ handleCreateTransaction ~ error",
      error
    );
  }
};

const handleViewTransaction = async () => {
  try {
    const URL = `http://localhost:3001/routerAPI/viewTransaction`;
    const viewTransaction = await axios.get(URL);
    return viewTransaction;
  } catch (error) {}
};

const handleCreateComment = async (payload) => {
  try {
    const URL = `http://localhost:3001/routerAPI/createComment`;
    const response = await axios.post(URL, payload);
  } catch (error) {}
};

const handleGetComment = async (postId) => {
  try {
    const URL = `http://localhost:3001/routerAPI/getComment/${postId}`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {}
};

const handleLike = async (postId, liked) => {
  try {
    const payload = { liked };

    const URL = `http://localhost:3001/routerAPI/getLikedPost/${postId}`;
    const response = await axios.put(URL, payload);
    return response;
  } catch (error) {
    console.log("🚀 ~ file: UserAPI.js ~ line 248 ~ handleLike ~ error", error);
  }
};
const handleUnLike = async (postId, liked) => {
  try {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 254 ~ handleUnLike ~ postId",
      postId
    );
    const payload = { liked };

    const URL = `http://localhost:3001/routerAPI/getUnLikedPost/${postId}`;
    const response = await axios.put(URL, payload);

    return response;
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 257 ~ handleUnLike ~ error",
      error
    );
  }
};

const handleFollowingStore = async (id, following) => {
  try {
    const url = "http://localhost:3001/routerAPI/getStoreFollowing/";
    const response = handleFollowing(id, following, url);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 279 ~ handleFollowingStore ~ error",
      error
    );
  }
};

const handleUnFollowingStore = async (id, following) => {
  try {
    const url = "http://localhost:3001/routerAPI/getStoreUnFollowing/";
    const response = handleFollowing(id, following, url);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 279 ~ handleFollowingStore ~ error",
      error
    );
  }
};
const handleGetInvoiceByProduct = async (productId) => {
  const URL = `http://localhost:3001/routerAPI/getInvoiceByProduct/${productId}`;
  const response = await axios.get(URL);
  return response.data;
};
const handleFollowingUser = async (id, following) => {
  try {
    const url = "http://localhost:3001/routerAPI/getUserFollowing/";

    const response = handleFollowing(id, following, url);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 279 ~ handleFollowingStore ~ error",
      error
    );
  }
};

const handleUnFollowingUser = async (id, following) => {
  try {
    const url = "http://localhost:3001/routerAPI/getUserUnFollowing/";

    const response = handleFollowing(id, following, url);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 279 ~ handleFollowingStore ~ error",
      error
    );
  }
};

const handleGetUserFollowing = async (id) => {
  try {
    const URL = `http://localhost:3001/routerAPI/getUserFollow/${id}`;
    const response = await axios.get(URL);
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 335 ~ handleGetUserFollowing ~ response",
      response
    );
    return response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 333 ~ handleGetUserFollowing ~ error",
      error
    );
  }
};

const handleReplyComment = async (payload) => {
  try {
    const URL = `http://localhost:3001/routerAPI/createReply`;
    const response = await axios.post(URL, payload);
  } catch (error) {}
};
const handleGetReplyByComment = async (commentId) => {
  try {
    const URL = `http://localhost:3001/routerAPI/getReply/${commentId}`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 361 ~ handleGetReplyByComment ~ error",
      error
    );
  }
};

const handleSearchUser = async (query) => {
  try {
    const URI = `http://localhost:3001/routerAPI/searchUser?query=${query}&page=1&limit=5`;
    const response = await axios.get(URI);
    return response.data.docs;
  } catch (error) {}
};

const handleGetAllUser = async () => {
  try {
    const URL = `http://localhost:3001/routerAPI/getUser`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {}
};

const handleGetAllStore = async () => {
  try {
    const URL = `http://localhost:3001/routerAPI/getStore`;
    const response = await axios.get(URL);
    return response.data;
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
  handleCreateInvoice,
  handleUpdateInvoice,
  handleGetInvoice,
  handleGetInvoiceByUser,
  handleCreateTransaction,
  handleViewTransaction,
  handleGetComment,
  handleCreateComment,
  handleGetPostByAuthor,
  handleLike,
  handleUnLike,
  handleFollowingStore,
  handleUnFollowingStore,
  handleGetInvoiceByProduct,
  handleFollowingUser,
  handleUnFollowingUser,
  handleGetUserFollowing,
  handleReplyComment,
  handleGetReplyByComment,
  handleSearchUser,
  handleGetAllUser,
  handleGetAllStore,
};
