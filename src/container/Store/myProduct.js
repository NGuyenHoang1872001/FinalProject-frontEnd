import { useEffect, useState } from "react";
import { handleGetStore, handleGetProductStore } from "../../API/UserAPI";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProduct = () => {
  const navigate = useNavigate();
  const authLogin = useSelector((state) => state.auth.id);
  const storeOfProduct = useSelector((state) => state.storeIdProduct.store_id);
  console.log(
    "🚀 ~ file: myProduct.js ~ line 11 ~ MyProduct ~ storeOfProduct",
    storeOfProduct
  );
  const [store, setStoreId] = useState([]);

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
  useEffect(() => {
    getProductStore();
    getDetailStore();
  }, []);
  return (
    <div>
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
      <div>
        <button
          className="btn btn-outline btn-success"
          onClick={() => createProduct(storeDetail.data._id)}
        >
          create Product
        </button>
      </div>

      <div className="flex flex-row ">
        {productDetail.data &&
          productDetail.data.map((products) => (
            <div className="border m-[20px] rounded w-[20vw] p-4">
              <p key={products._id}>{products.name}</p>
              <p>{products.cover}</p>
              <p>{products.description}</p>

              <p>{products.price}</p>
              <button className="border m-[20px] rounded">Buy</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyProduct;
