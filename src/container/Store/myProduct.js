import { useEffect, useState } from "react";
import {
  handleGetStore,
  handleGetProductStore,
  handleDeleteProduct,
} from "../../API/UserAPI";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProduct = () => {
  const navigate = useNavigate();

  const storeOfProduct = useSelector((state) => state.storeIdProduct.store_Id);
  console.log(
    "🚀 ~ file: myProduct.js ~ line 11 ~ MyProduct ~ storeOfProduct",
    storeOfProduct
  );
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

  const updateProduct = (productId, name, cover, description, price) => {
    try {
      const payload = { productId, name, cover, description, price };
      navigate("/updateProduct", { state: { payload: payload } });
    } catch (error) {}
  };

  const getProduct = (productId) => {
    try {
      setProductId(productId);
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
            <div className="border m-[20px] rounded w-[20vw] p-4 relative">
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
                          products.price
                        )
                      }
                    >
                      edit
                    </label>
                  </li>
                </ul>
              </div>
              <p key={products._id}>{products.name}</p>
              <p>{products.cover}</p>
              <p>{products.description}</p>

              <p>{products.price}</p>
            </div>
          ))}
      </div>

      {/* Modal */}
      <div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Are you sure ?</h3>
            <div className="flex row justify-center gap-3">
              <label
                htmlFor="my-modal-3"
                className="border-2 width 30px"
                onClick={() => deleteProduct()}
              >
                Yes
              </label>
              <label htmlFor="my-modal-3" className="border-2 width 30px">
                {" "}
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
