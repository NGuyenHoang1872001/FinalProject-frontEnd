import { handleGetAllPost, handleCreatePost } from "../API/UserAPI";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AcceptModal from "./Modal/acceptModal";

const PostContainer = () => {
  const authLogin = useSelector((state) => state.auth.id);
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState([]);

  const getAllPost = async () => {
    try {
      const postData = await handleGetAllPost();
      setPost(postData);
    } catch (error) {
      console.log(
        "🚀 ~ file: HomePage.js ~ line 11 ~ handleGetAllPost ~ error",
        error
      );
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const getStore = async (store_Id) => {
    try {
      const storeId = store_Id;
      navigate("/viewStore", { state: { store_Id: storeId } });
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 33 ~ getStore ~ error",
        error
      );
    }
  };

  const createPost = async (req, res) => {
    try {
      const author = authLogin;
      const title = document.querySelector("#TitleInput").value;
      const store = document.querySelector("#StoreInput").value;
      const payload = { author, title, store };
      console.log(
        "🚀 ~ file: postContainer.js ~ line 45 ~ createPost ~ payload",
        payload
      );
      const response = await handleCreatePost(payload);
      getAllPost();
    } catch (error) {}
  };

  const deletePost = async (postId) => {
    try {
      setPostId(postId);
    } catch (error) {}
  };
  return (
    <div className="flex flex-col p-[20px] items-center">
      <div>
        <div>
          <textarea
            id="TitleInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="What do you think"
          ></textarea>
          <textarea
            id="StoreInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Store"
          ></textarea>
        </div>
        <div>
          <button onClick={() => createPost()}>Create Post</button>
        </div>
      </div>
      <div>
        {post.data &&
          post.data.map((rows) => (
            <div className="border m-[20px] rounded w-[80vw] relative">
              <div className="p-[20px]">
                <p key={rows._id}>{rows.title}</p>
                <p key={rows._id}>{rows.cover}</p>
              </div>

              <div className="dropdown   dropdown-left dropdown-end absolute  top-0 right-0  ">
                <label
                  tabIndex={0}
                  className="btn btn-circle swap swap-rotate m-1"
                >
                  <input type="checkbox" />

                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
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
                      onClick={() => deletePost(rows._id)}
                    >
                      delete
                    </label>
                  </li>
                  <li>
                    <button>edit</button>
                  </li>
                </ul>
              </div>

              <div className="flex flex-row justify-around ">
                <button className="border rounded w-[30vw] m-[2px]">
                  Like
                </button>
                <button className="border rounded w-[30vw] m-[2px]">
                  Comment
                </button>
                <button
                  className="border rounded w-[30vw] m-[2px]"
                  onClick={() => getStore(rows.store)}
                >
                  Store
                </button>
              </div>
            </div>
          ))}
      </div>
      <AcceptModal postId={postId}></AcceptModal>
    </div>
  );
};

export default PostContainer;
