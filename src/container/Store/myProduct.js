import { useEffect, useState } from "react";
import {
  handleGetStore,
  handleGetProductStore,
  handleDeleteProduct,
  handleFollowingStore,
  handleUnFollowingStore,
} from "../../API/UserAPI";

import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Avata from "../../component/Avata";
import ShowPicture from "./showPicture";

const MyProduct = () => {
  const navigate = useNavigate();

  const storeOfProduct = useSelector((state) => state.storeIdProduct.store_Id);
  const authLogin = useSelector((state) => state.auth.id);
  const location = useLocation();
  const [productId, setProductId] = useState([]);
  const [storeDetail, setStoreDetail] = useState([]);

  const [productDetail, setProductDetail] = useState([]);

  const getDetailStore = async () => {
    try {
      const getStore = await handleGetStore(storeOfProduct);
      setStoreDetail(getStore);
    } catch (error) {}
  };

  const getProductStore = async () => {
    try {
      const getProduct = await handleGetProductStore(storeOfProduct);

      setProductDetail(getProduct);
    } catch (error) {
      console.log(
        "🚀 ~ file: storeContainer.js ~ line 32 ~ getProductStore ~ error",
        error
      );
    }
  };

  const createProduct = (storeId) => {
    navigate("/createProduct", { state: { storeID: storeId } });
  };

  const updateProduct = (
    productId,
    name,
    cover,
    description,
    price,
    quantity
  ) => {
    try {
      const payload = { productId, name, cover, description, price, quantity };
      navigate("/updateProduct", { state: { payload: payload } });
    } catch (error) {}
  };

  const getProduct = (product) => {
    try {
      setProductId(product);
    } catch (error) {}
  };
  const deleteProduct = async () => {
    try {
      const response = await handleDeleteProduct(productId);
      getProductStore();
    } catch (error) {
      console.log(
        "🚀 ~ file: myProduct.js ~ line 64 ~ deletProduct ~ error",
        error
      );
    }
  };
  const addFollowing = async () => {
    try {
      const addFollowing = await handleFollowingStore(
        storeOfProduct,
        authLogin
      );
      getDetailStore();
    } catch (error) {
      console.log(
        "🚀 ~ file: storeContainer.js ~ line 58 ~ addFollowing ~ error",
        error
      );
    }
  };
  const addUnFollowing = async () => {
    try {
      const addUnFollowing = await handleUnFollowingStore(
        storeOfProduct,
        authLogin
      );
      getDetailStore();
    } catch (error) {
      console.log(
        "🚀 ~ file: storeContainer.js ~ line 58 ~ addFollowing ~ error",
        error
      );
    }
  };
  const [cover, setCover] = useState([]);
  const handleGetCover = async (cover, productId) => {
    if (cover && productId) {
      setCover(cover);
      setProductId(productId);
    }
  };
  useEffect(() => {
    getProductStore();
    getDetailStore();
  }, []);
  return authLogin ? (
    <div>
      <div className="rounded-2xl border-2 mt-3 shadow-lg">
        {storeDetail.data && (
          <div className=" flex flex-rows justify-between w-[80vw] p-6">
            <div className=" flex flex-row">
              <div className="mr-[8px]">
                <Avata width="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></Avata>
              </div>
              <div>
                <p className="font-bold text-5xl">{storeDetail.data.name}</p>
              </div>
            </div>
            <div>
              <div>
                {storeDetail.data.following.includes(authLogin) ? (
                  <div>
                    <button
                      className="border rounded-xl h-[30px] w-[20vw] m-[2px] bg-[#0f80f2] text-white"
                      onClick={() => addUnFollowing()}
                    >
                      Following
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="border rounded-xl h-[30px] w-[20vw] m-[2px] bg-[#ffff] text-blue-600/100"
                      onClick={() => addFollowing()}
                    >
                      Following
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col text-center font-medium">
                {productDetail.data ? (
                  <p>Quantity of Product: {productDetail.data.length}</p>
                ) : (
                  <div></div>
                )}

                <p>Following: {storeDetail.data.following.length}</p>
              </div>
            </div>
            <div className="font-extralight">
              <p>ID Shop: {storeDetail.data._id}</p>

              <p>Email: {storeDetail.data.email}</p>
              <p>PhoneNumber: 84+ {storeDetail.data.phoneNumber}</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <button
          className="btn btn-outline btn-success mt-8 shadow-md ml-2"
          onClick={() => createProduct(storeDetail.data._id)}
        >
          create Product
        </button>
      </div>

      <div className=" grid gap-4 grid-cols-3 grid-rows-3 ">
        {productDetail.data &&
          productDetail.data.map((products) => (
            <div className="w-[20vw] p-4 rounded-2xl border-2 mt-5 ml-3 shadow-md relative">
              <div className="dropdown   dropdown-left dropdown-end absolute top-0 right-0 h-16 w-16  ">
                <label
                  tabIndex={0}
                  className="btn btn-circle swap swap-rotate m-1"
                >
                  <input type="checkbox" />

                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <label
                      htmlFor="my-modal-3"
                      className=""
                      onClick={() => getProduct(products._id)}
                    >
                      delete
                    </label>
                  </li>
                  <li>
                    <label
                      onClick={() =>
                        updateProduct(
                          products._id,
                          products.name,
                          products.cover,
                          products.description,
                          products.price,
                          products.quantity
                        )
                      }
                    >
                      edit
                    </label>
                  </li>
                </ul>
              </div>
              <div className="font-bold ">
                <p key={products._id}> Name: {products.name}</p>
                <p>Description: {products.description}</p>
                <p>Price: {products.price}</p>
                <p>Quantity: {products.quantity}</p>
              </div>
              <div className="ml-[100px] border-2 rounded-2xl w-24  text-center mt-4 ">
                <label
                  for="my-modal-5"
                  onClick={() => handleGetCover(products.cover, products._id)}
                >
                  View
                </label>
              </div>
            </div>
          ))}
      </div>
      <ShowPicture cover={cover} id={productId}></ShowPicture>
      {/* Modal */}
      <div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative font-light text-black">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold text-center mb-10">
              Are you sure ?
            </h3>
            <div className="flex row justify-center gap-3">
              <label
                htmlFor="my-modal-3"
                className="border-2 rounded-2xl w-24 text-center"
                onClick={() => deleteProduct()}
              >
                Yes
              </label>
              <label
                htmlFor="my-modal-3"
                className="border-2 rounded-2xl w-24 text-center"
              >
                {" "}
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};

export default MyProduct;
