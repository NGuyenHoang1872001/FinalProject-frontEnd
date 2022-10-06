import { handleGetOwnerStore } from "../../API/UserAPI";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const MyStore = () => {
  const authLogin = useSelector((state) => state.auth.id);
  const [store, setStore] = useState([]);
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

  const updateStore = (storeId, cover, title) => {
    const payload = { storeId, cover, title };

    navigate("/updateStore", { state: { payload: payload } });
  };
  return (
    <div>
      <button className="btn btn-success" onClick={() => createStore()}>
        Create Store
      </button>
      <div>
        <div className="flex flex-row flex-wrap ">
          {store.data &&
            store.data.map((store) => (
              <div className="border m-[20px] rounded w-[30vw] p-4 relative">
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
                              //   onClick={() => getPostId(rows._id)}
                            >
                              delete
                            </label>
                          </li>
                          <li>
                            <label
                              onClick={() =>
                                updateStore(store._id, store.cover, store.title)
                              }
                            >
                              edit
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p key={store._id}>Cover: {store._id}</p>
                    <p>Title: {store.title}</p>
                    <p>Cover: {store.cover}</p>
                  </div>
                  <button className="border m-[20px] rounded">Show</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default MyStore;
