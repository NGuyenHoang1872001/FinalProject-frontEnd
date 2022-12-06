import { handleGetOwnerStore, handleDeleteStore } from "../../API/UserAPI";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setStoreIdProduct } from "../../Redux/features/storeIdProduct";

const MyStore = () => {
  const dispatch = useDispatch();
  const authLogin = useSelector((state) => state.auth.id);

  const [store, setStore] = useState([]);
  console.log("🚀 ~ file: myStore.js:12 ~ MyStore ~ store", store);

  const [storeId, setStoreId] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllStore();
  }, []);
  const getAllStore = async (req, res) => {
    try {
      const ownerId = authLogin;

      const response = await handleGetOwnerStore(ownerId);
      setStore(response);
    } catch (error) {
      console.log(
        "🚀 ~ file: myStore.js ~ line 20 ~ getAllStore ~ error",
        error
      );
    }
  };
  const createStore = () => {
    navigate("/createStore");
  };

  const updateStore = (storeId, name, email, phoneNumber) => {
    const payload = { storeId, name, email, phoneNumber };

    navigate("/updateStore", { state: { payload: payload } });
  };
  const getStore = async (store_Id) => {
    try {
      const store = { store_Id };

      dispatch(setStoreIdProduct(store));
      navigate("/viewMyProduct", {
        state: { store_Id: store },
      });
    } catch (error) {
      console.log("🚀 ~ file: myStore.js ~ line 55 ~ getStore ~ error", error);
    }
  };

  const getStoreId = async (storeId) => {
    try {
      setStoreId(storeId);
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 55 ~ deletePost ~ error",
        error
      );
    }
  };

  const deleteStore = async () => {
    const store = storeId;

    const response = await handleDeleteStore(store);
    getAllStore();
  };
  return (
    <div className="rounded-2xl border-2 mt-3 shadow-lg w-[80vw] h-[100vh] p-4  ">
      {store.data && store.data.length == 0 ? (
        <div>
          {" "}
          <button className="btn btn-success" onClick={() => createStore()}>
            Create Store
          </button>
        </div>
      ) : (
        <div></div>
      )}

      <div>
        <div className="flex flex-row flex-wrap justify-center ">
          {store.data &&
            store.data.map((store) => (
              <div className=" m-[20px] rounded-2xl border-2 mt-5 ml-3 shadow-md w-[30vw] p-4 relative ">
                <div>
                  <div>
                    <div>
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
                              onClick={() => getStoreId(store._id)}
                            >
                              delete
                            </label>
                          </li>
                          <li>
                            <label
                              onClick={() =>
                                updateStore(
                                  store._id,
                                  store.name,
                                  store.email,
                                  store.phoneNumber
                                )
                              }
                            >
                              edit
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold ">
                      <p key={store._id}>ID: {store._id}</p>
                      <p>Name: {store.name}</p>
                      <p>Email: {store.email}</p>
                      <p>PhoneNumber: {store.phoneNumber}</p>
                    </div>
                    <div className="text-center">
                      <button
                        className=" m-[20px] border-2 rounded-2xl w-24"
                        onClick={() => getStore(store._id, store.ownerId)}
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        {/* PopUpDelete */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
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
                className=" border-2 rounded-2xl w-24 text-center"
                onClick={() => deleteStore()}
              >
                Yes
              </label>
              <label
                htmlFor="my-modal-3"
                className=" border-2 rounded-2xl w-24 text-center"
              >
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
export default MyStore;
