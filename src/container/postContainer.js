import {
  handleGetAllPost,
  handleCreatePost,
  handleGetOnePost,
  handleDeletePost,
  handleLike,
  handleUnLike,
  handleReport,
} from "../API/UserAPI";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";

import { FaStore } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setStoreIdProduct } from "../Redux/features/storeIdProduct";
import Comment from "../component/Comment/comment";
import PersonLikedPost from "../component/PersonLikedPost";

const PostContainer = () => {
  const dispatch = useDispatch();
  const authLogin = useSelector((state) => state.auth.id);
  const authRole = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  console.log("🚀 ~ file: postContainer.js:22 ~ PostContainer ~ post", post);

  const [postId, setPostId] = useState([]);
  const [authorId, setAuthorId] = useState([]);

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

  const getPostId = async (postId, authorId) => {
    try {
      setPostId(postId);
      setAuthorId(authorId);
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 55 ~ deletePost ~ error",
        error
      );
    }
  };

  const deletePost = async () => {
    const post = postId;
    const response = await handleDeletePost(post);

    getAllPost();
  };

  const editPost = async (postId) => {
    try {
      const post = postId;
      const payload = await handleGetOnePost(postId);

      navigate("/updatePost", { state: { payload: payload, postId: postId } });
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 76 ~ editPost ~ error",
        error
      );
    }
  };

  const likePost = async (postId) => {
    try {
      const likeByAuthor = await handleLike(postId, authLogin);
      getAllPost();
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 108 ~ likePost ~ error",
        error
      );
    }
  };
  const unLikePost = async (postId) => {
    try {
      const unLikeByAuthor = await handleUnLike(postId, authLogin);
      getAllPost();
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 108 ~ likePost ~ error",
        error
      );
    }
  };
  const getUserPage = (userId) => {
    try {
      navigate("/userProfile", {
        state: {
          userId: userId,
        },
      });
    } catch (error) {}
  };
  const reportPost = async () => {
    try {
      const report = authLogin;
      const reportPost = await handleReport(postId, report);
    } catch (error) {}
  };

  useEffect(() => {
    getAllPost();
    getPostId();
  }, []);

  return (
    <div className="flex flex-col pl-[20px] pr-[20px] ">
      <div className="mt-3">
        {post.data &&
          post.data.map((rows) => (
            <div className=" mb-[20px] rounded w-[80vw] relative shadow-xl border-2">
              <div className="p-[20px]">
                <div className="flex flex-row mb-[20px]">
                  <div className="avatar">
                    <div className="w-12  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src="https://placeimg.com/192/192/people" />
                    </div>
                  </div>
                  <button
                    className="ml-[10px] font-medium"
                    onClick={() => {
                      getUserPage(rows.author._id);
                    }}
                  >
                    {rows.author.firstName} {rows.author.lastName}
                  </button>
                </div>

                <p key={rows._id} className="ml-7">
                  {rows.title}
                </p>
                <div className="mt-[20px] mb-8">
                  <img
                    src={rows.cover}
                    className="block ml-auto mr-auto w-[60%] "
                  ></img>
                </div>
              </div>

              <div className="dropdown   dropdown-left dropdown-end absolute  top-0 right-0  ">
                <div className="App">
                  <div className="container">
                    <button type="button" class="button text-3xl  mt-5 mr-5">
                      ☰
                    </button>
                  </div>
                </div>
                <div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {authRole == "admin" ? (
                      <div>
                        {" "}
                        <li>
                          <label
                            htmlFor="my-modal-3"
                            className=""
                            onClick={() => getPostId(rows._id)}
                          >
                            Delete
                          </label>
                        </li>
                        <li>
                          <label
                            htmlFor="my-modal-7"
                            className=""
                            onClick={() => getPostId(rows._id)}
                          >
                            Report
                          </label>
                        </li>
                      </div>
                    ) : (
                      <div>
                        {" "}
                        {authLogin == rows.author._id ? (
                          <div>
                            {" "}
                            <li>
                              <label
                                htmlFor="my-modal-4"
                                onClick={() => editPost(rows._id)}
                              >
                                Edit
                              </label>
                            </li>
                            <li>
                              <label
                                htmlFor="my-modal-3"
                                className=""
                                onClick={() => getPostId(rows._id)}
                              >
                                Delete
                              </label>
                            </li>
                          </div>
                        ) : (
                          <div>
                            {" "}
                            <li>
                              <label
                                htmlFor="my-modal-7"
                                className=""
                                onClick={() => getPostId(rows._id)}
                              >
                                Report
                              </label>
                            </li>
                          </div>
                        )}
                      </div>
                    )}
                  </ul>
                </div>
              </div>
              <div>
                <PersonLikedPost liked={rows.liked.length}></PersonLikedPost>
              </div>

              <div className="flex flex-row justify-around mb-4 p-2 ">
                {rows.liked.includes(authLogin) ? (
                  <div>
                    <button
                      className="border rounded-xl h-[50px] w-[30vw] m-[2px]  text-blue-600/100 "
                      onClick={() => unLikePost(rows._id)}
                    >
                      <FaHeart className="ml-[47%] text-2xl" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="border rounded-xl h-[50px] w-[30vw] m-[2px]  text-blue-600/100 "
                      onClick={() => likePost(rows._id)}
                    >
                      <FaHeartBroken className="ml-[47%] text-2xl"></FaHeartBroken>
                    </button>
                  </div>
                )}

                <label
                  onClick={() => {
                    getPostId(rows._id, rows.author._id);
                  }}
                  className="border rounded-xl h-[50px] w-[25vw] m-[2px] bg-[#ffff] text-blue-600/100 text-center p-[10px]"
                  for="my-modal-5"
                >
                  <FaFacebookMessenger className="ml-[47%] text-2xl"></FaFacebookMessenger>
                </label>
                <button
                  className="border rounded-xl h-[50px] w-[25vw] m-[2px] bg-[#ffff] text-blue-600/100"
                  onClick={() => getStore(rows.store)}
                >
                  <FaStore className="ml-[47%] text-2xl"></FaStore>
                </button>
              </div>
            </div>
          ))}
      </div>

      <Comment postID={postId} authorId={authorId}></Comment>
      {/* Modal Report */}

      <div>
        <input type="checkbox" id="my-modal-7" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-7"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold text-center mb-10">
              Are you sure report this post ?
            </h3>
            <div className="flex row justify-center gap-3">
              <label
                htmlFor="my-modal-7"
                className="border-2 rounded-2xl w-24 text-center"
                onClick={() => reportPost()}
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
            <h3 className="text-lg font-bold text-center mb-10">
              Are you sure ?
            </h3>
            <div className="flex row justify-center gap-3">
              <label
                htmlFor="my-modal-3"
                className="border-2 rounded-2xl w-24 text-center"
                onClick={() => deletePost()}
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
  );
};

export default PostContainer;
