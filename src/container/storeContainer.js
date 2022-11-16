import { useEffect, useState } from "react";
import { handleGetStore, handleGetProductStore } from "../API/UserAPI";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const StoreContainer = () => {
  const storeOfProduct = useSelector((state) => state.storeIdProduct.store_Id);

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

  const getInfoCustomer = (quantity, price, storeEmail) => {
    navigate("/info", {
      state: {
        quantityProduct: quantity,
        priceProduct: price,
        storeEmail: storeEmail,
      },
    });
  };
  useEffect(() => {
    getProductStore();
    getDetailStore();
  }, []);
  return (
    <div>
      <div>Hello StoreContainer</div>
      <div>
        {storeDetail.data && (
          <div>
            <p>ID Shop: {storeDetail.data._id}</p>
            <p>{storeDetail.data.name}</p>
            <p>{storeDetail.data.email}</p>
            <p>{storeDetail.data.phoneNumber}</p>
          </div>
        )}
      </div>
      <div></div>

      <div className="flex flex-row ">
        {productDetail.data &&
          productDetail.data.map((products) => (
            <div className="border m-[20px] rounded w-[20vw] p-4">
              <p key={products._id}>Name: {products.name}</p>
              <p>Quantity: {products.quantity}</p>

              <p>Price: {products.price}</p>
              <button
                className="border m-[20px] rounded"
                onClick={() =>
                  getInfoCustomer(
                    products.quantity,
                    products.price,
                    storeDetail.data.email
                  )
                }
              >
                Buy
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoreContainer;
