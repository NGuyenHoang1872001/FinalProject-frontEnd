import { useEffect, useState } from "react";
import { handleGetStore, handleGetProductStore } from "../API/UserAPI";
import { useLocation } from "react-router-dom";
const StoreContainer = () => {
  const { state } = useLocation();
  const { store_Id } = state;

  const [storeDetail, setStoreDetail] = useState([]);

  const [productDetail, setProductDetail] = useState([]);
  console.log(
    "🚀 ~ file: storeContainer.js ~ line 11 ~ StoreContainer ~ productDetail",
    productDetail
  );

  const getDetailStore = async () => {
    try {
      const getStore = await handleGetStore(store_Id);
      setStoreDetail(getStore);
    } catch (error) {}
  };

  const getProductStore = async () => {
    try {
      const getProduct = await handleGetProductStore(store_Id);

      setProductDetail(getProduct);
    } catch (error) {
      console.log(
        "🚀 ~ file: storeContainer.js ~ line 32 ~ getProductStore ~ error",
        error
      );
    }
  };
  useEffect(() => {
    getProductStore();
    getDetailStore();
  }, []);
  return (
    <div>
      <div>
        {storeDetail.data && (
          <div>
            <p>{storeDetail.data._id}</p>
            <p>{storeDetail.data.title}</p>
            <p>{storeDetail.data.cover}</p>
            <p>{storeDetail.data.ownerId}</p>
          </div>
        )}
      </div>

      <div className="flex flex-row ">
        {productDetail.data &&
          productDetail.data.map((products) => (
            <div className="border m-[20px] rounded w-[20vw] p-4">
              <p key={products._id}>{products.title}</p>

              <p>{products.price}</p>
              <button className="border m-[20px] rounded">Buy</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoreContainer;
