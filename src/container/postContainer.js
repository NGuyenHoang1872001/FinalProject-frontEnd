import {
  handleGetAllPost,
  handleCreatePost,
  handleGetOnePost,
  handleDeletePost,
} from "../API/UserAPI";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setStoreIdProduct } from "../Redux/features/storeIdProduct";

const PostContainer = () => {
  const dispatch = useDispatch();
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
        "🚀 ~ file: postContainer.js ~ line 25 ~ getAllPost ~ error",
        error
      );
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const getStore = async (store_Id) => {
    try {
      const store = { store_Id };

      dispatch(setStoreIdProduct(store));

      navigate("/viewStore");
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 33 ~ getStore ~ error",
        error
      );
    }
  };

  const getPostId = async (postId) => {
    try {
      setPostId(postId);
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 55 ~ deletePost ~ error",
        error
      );
    }
  };
  const deletePost = async () => {
    const post = postId;
    console.log(
      "🚀 ~ file: postContainer.js ~ line 61 ~ deletePost ~ post",
      post
    );
    const response = await handleDeletePost(post);
    getAllPost();
  };

  const editPost = async (postId) => {
    try {
      const post = postId;
      const payload = await handleGetOnePost(postId);
      console.log(
        "🚀 ~ file: postContainer.js ~ line 58 ~ editPost ~ payload",
        payload
      );

      navigate("/updatePost", { state: { payload: payload, postId: postId } });
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 76 ~ editPost ~ error",
        error
      );
    }
  };

  const createPost = () => {
    navigate("/createPost");
  };

  return (
    <div className="flex flex-col p-[20px] items-center">
      <div>
        <button className="btn btn-success" onClick={() => createPost()}>
          Create Post
        </button>
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
                      onClick={() => getPostId(rows._id)}
                    >
                      delete
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="my-modal-4"
                      onClick={() => editPost(rows._id)}
                    >
                      edit
                    </label>
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
                onClick={() => deletePost()}
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

export default PostContainer;
