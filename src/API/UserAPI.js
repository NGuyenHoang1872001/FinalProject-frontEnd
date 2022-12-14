import axios, { Axios } from "axios";
import { comment } from "postcss";
import { handleFollowing, handleUnFollowing } from "./UserAPIFollowing";

const handleRegisterUser = async (data) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/register`;
    const dataUser = data;
    const createUser = await axios.post(URL, dataUser);
    return createUser.data;
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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/login`;

    const token = await axios.post(URL, payload);
    return token;
  } catch (error) {
    console.log("🚀 ~ file: UserAPI.js:33 ~ handleLoginUser ~ error", error);
  }
};

const handleGetAllPost = async () => {
  const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getPost`;
  const getData = await axios.get(URL);
  return getData;
};

const handleGetStore = async (storeId) => {
  const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getOneStore/${storeId}`;
  const getStore = await axios.get(URL);
  return getStore;
};

const handleGetProductStore = async (storeId) => {
  const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/productInStore/${storeId}`;
  const getProduct = await axios.get(URL);
  return getProduct;
};

const handleCreatePost = async (payload) => {
  const URl = `${process.env.React_App_URL_Backend_deploy}/routerAPI/createPost`;
  const createPost = await axios.post(URl, payload);
  return createPost;
};

const handleDeletePost = async (post) => {
  const postId = post;
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 42 ~ handleDeletePost ~ postId",
    postId
  );

  const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/deletePost/${postId}`;
  const deletePost = await axios.delete(URL);
};

const handleGetOnePost = async (postId) => {
  const getPostId = postId;
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 52 ~ handleGetOnePost ~ getPostId",
    getPostId
  );
  const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getOnePost/${getPostId}`;
  const getOnePost = await axios.get(URL);
  return getOnePost.data;
};

const handleGetPostByAuthor = async (authorId) => {
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 65 ~ handleGetPostByAuthor ~ authorId",
    authorId
  );
  const URl = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getPostByAuthor/${authorId}`;
  const getPost = await axios.get(URl);
  return getPost.data;
};

const handleUpdatePost = async (postId, payload) => {
  console.log("hello", payload);
  const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/updatePost/${postId}`;
  const updatePost = await axios.put(URL, payload);
};

const handleGetOwnerStore = async (ownerId) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getOwnerStore/${ownerId}`;
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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/createStore`;
    const response = await axios.post(URL, payload);
    return response;
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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/updateStore/${storeId}`;
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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/deleteStore/${storeId}`;
    const response = await axios.delete(URL);
  } catch (error) {}
};

const handleCreateProduct = async (payload) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/createProduct`;
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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/updateProduct/${productId}`;
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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/deleteProduct/${productId}`;
    const response = await axios.delete(URL);
  } catch (error) {}
};

const handleGetDetailUser = async (userId) => {
  try {
    const URl = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getDetailUser/${userId}`;
    const response = await axios.get(URl);
    return response;
  } catch (error) {}
};

const handleCreateInvoice = async (payload) => {
  console.log(
    "🚀 ~ file: UserAPI.js ~ line 160 ~ handleCreateInvoice ~ payload",
    payload
  );
  const URl = `${process.env.React_App_URL_Backend_deploy}/routerAPI/createInvoice`;
  const createInvoice = await axios.post(URl, payload);
  return createInvoice;
};

const handleUpdateInvoice = async (id, option) => {
  try {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 170 ~ handleUpdateInvoice ~ option",
      option
    );
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/updateInvoice/${id}`;
    const updateInvoice = await axios.put(URL, option);
  } catch (error) {}
};

const handleGetInvoice = async () => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getInvoice`;
    const getInvoice = await axios.get(URL);
    return getInvoice;
  } catch (error) {}
};

const handleGetInvoiceByUser = async (userId) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getInvoiceByAuthor/${userId}`;
    const getInvoiceByUser = await axios.get(URL);
    return getInvoiceByUser;
  } catch (error) {}
};

const handleCreateTransaction = async (payload) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/createTransaction`;
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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/viewTransaction`;
    const viewTransaction = await axios.get(URL);
    return viewTransaction;
  } catch (error) {}
};

const handleCreateComment = async (payload) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/createComment`;
    const response = await axios.post(URL, payload);
  } catch (error) {}
};

const handleGetComment = async (postId) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getComment/${postId}`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {}
};

const handleLike = async (postId, liked) => {
  try {
    const payload = { liked };

    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getLikedPost/${postId}`;
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

    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getUnLikedPost/${postId}`;
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
    const url = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getStoreFollowing/`;
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
    const url = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getStoreUnFollowing/`;
    const response = handleFollowing(id, following, url);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPI.js ~ line 279 ~ handleFollowingStore ~ error",
      error
    );
  }
};
const handleGetInvoiceByProduct = async (productId) => {
  const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getInvoiceByProduct/${productId}`;
  const response = await axios.get(URL);
  return response.data;
};
const handleFollowingUser = async (id, following) => {
  try {
    const url = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getUserFollowing/`;

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
    const url = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getUserUnFollowing/`;

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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getUserFollow/${id}`;
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
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/createReply`;
    const response = await axios.post(URL, payload);
  } catch (error) {}
};
const handleGetReplyByComment = async (commentId) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getReply/${commentId}`;
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
    const URI = `${process.env.React_App_URL_Backend_deploy}/routerAPI/searchUser?query=${query}&page=1&limit=5`;
    const response = await axios.get(URI);
    return response.data.docs;
  } catch (error) {}
};

const handleGetAllUser = async () => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getUser`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {}
};

const handleGetAllStore = async () => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getStore`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {}
};

const handleUpdateUser = async (userId, option) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/updateUser/${userId}`;
    const response = axios.put(URL, option);
    console.log("hello okeii");
  } catch (error) {
    console.log("🚀 ~ file: UserAPI.js:420 ~ handleUpdateUser ~ error", error);
  }
};
const handleGetUserMonthly = async () => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/userMonthly`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {}
};

const handleGetStoreMonthly = async () => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/storeMonthly`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {}
};
const handleGetProductMonthly = async () => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/productMonthly`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {}
};

const handleReport = async (postId, payload) => {
  try {
    const URL = `${process.env.React_App_URL_Backend_deploy}/routerAPI/getReport/${postId}`;
    const response = await axios.put(URL, payload);
    return response;
  } catch (error) {
    console.log("🚀 ~ file: UserAPI.js ~ line 248 ~ handleLike ~ error", error);
  }
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
  handleUpdateUser,
  handleGetUserMonthly,
  handleGetStoreMonthly,
  handleGetProductMonthly,
  handleReport,
};
