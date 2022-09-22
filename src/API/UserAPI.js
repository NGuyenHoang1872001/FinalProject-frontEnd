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

export {
  handleRegisterUser,
  handleLoginUser,
  handleGetAllPost,
  handleGetStore,
  handleGetProductStore,
};
