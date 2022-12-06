import { useEffect, useState } from "react";
import {
  handleGetStore,
  handleGetProductStore,
  handleFollowingStore,
  handleUnFollowingStore,
} from "../API/UserAPI";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avata from "../component/Avata";
import ShowPicture from "./Store/showPicture";

const StoreContainer = () => {
  const location = useLocation();
  const storeOfProduct = useSelector((state) => state.storeIdProduct.store_Id);
  const authLogin = useSelector((state) => state.auth.id);

  const [storeDetail, setStoreDetail] = useState([]);
  const navigate = useNavigate();
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

  const getInfoCustomer = (productId, quantity, price, storeEmail) => {
    navigate("/info", {
      state: {
        product: productId,
        quantityPr: quantity,
        priceProduct: price,
        storeEmail: storeEmail,
      },
    });
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
  const handleGetCover = async (cover) => {
    if (cover) {
      setCover(cover);
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
              <h1 className="font-bold text-5xl">{storeDetail.data.name}</h1>
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
              <p className="">ID Shop: {storeDetail.data._id}</p>
              <p>Contac us:</p>
              <p>Email: {storeDetail.data.email}</p>
              <p>Phonenumber: {storeDetail.data.phoneNumber}</p>
            </div>
          </div>
        )}
      </div>
      {/* */}
      <div className="grid gap-4 grid-cols-3 grid-rows-3">
        {productDetail.data &&
          productDetail.data.map((products) => (
            <div className=" w-[20vw] p-4 rounded-2xl border-2 mt-5 ml-3 shadow-md">
              <div className="font-bold text-center">
                <p key={products._id}>Name: {products.name}</p>
                <p>Description: {products.description}</p>
                <p>Quantity: {products.quantity}</p>
                <p>Price: {products.price} $</p>
                <div className="font-normal flex flex-row m-5 justify-between ">
                  <div className=" border-2 rounded-2xl w-24">
                    <label
                      for="my-modal-5"
                      onClick={() => handleGetCover(products.cover)}
                    >
                      View
                    </label>
                  </div>

                  <div>
                    {products.quantity > 0 ? (
                      <button
                        className="border-2 rounded-2xl w-24"
                        onClick={() =>
                          getInfoCustomer(
                            products._id,
                            products.quantity,
                            products.price,
                            storeDetail.data.email
                          )
                        }
                      >
                        Buy
                      </button>
                    ) : (
                      <button className="border-2 rounded-2xl w-36 bg-red">
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          ))}
        <ShowPicture cover={cover}></ShowPicture>;
      </div>
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};

export default StoreContainer;
