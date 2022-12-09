import { useSelector, useDispatch } from "react-redux";
import {
  handleGetDetailUser,
  handleLike,
  handleUnLike,
  handleGetOnePost,
  handleDeletePost,
} from "../../API/UserAPI";
import { useEffect, useState } from "react";
import {
  handleGetPostByAuthor,
  handleGetUserFollowing,
} from "../../API/UserAPI";
import Comment from "../../component/Comment/comment";
import Avata from "../../component/Avata";
import PersonLikedPost from "../../component/PersonLikedPost.js";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { setStoreIdProduct } from "../../Redux/features/storeIdProduct";
import { useLocation } from "react-router-dom";

const AccountDetail = () => {
  const authLogin = useSelector((state) => state.auth.id);
  const authRole = useSelector((state) => state.auth.role);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [detailUser, setDetailUSer] = useState();
  const [postAuthor, setPostAuthor] = useState();

  const [userFollowing, setUserFollowing] = useState();

  const getPostbyAuthor = async () => {
    try {
      const response = await handleGetPostByAuthor(authLogin);
      setPostAuthor(response);
    } catch (error) {}
  };
  const handleGetFollowing = async () => {
    try {
      const id = authLogin;
      const response = await handleGetUserFollowing(id);
      setUserFollowing(response.length);
    } catch (error) {}
  };

  const findDetailUser = async () => {
    try {
      const getDetailUser = await handleGetDetailUser(authLogin);

      setDetailUSer(getDetailUser.data);
    } catch (error) {}
  };
  const likePost = async (postId) => {
    try {
      const likeByAuthor = await handleLike(postId, authLogin);
      getPostbyAuthor();
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
      getPostbyAuthor();
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 108 ~ likePost ~ error",
        error
      );
    }
  };
  const deletePost = async () => {
    const post = postId;
    const response = await handleDeletePost(post);

    getPostbyAuthor();
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

  const [postId, setPostId] = useState([]);
  const [authorId, setAuthorId] = useState([]);
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
  useEffect(() => {
    findDetailUser();
    getPostbyAuthor();
    handleGetFollowing();
  }, []);

  return authLogin ? (
    <div className="flex flex-col pl-[20px] pr-[20px] w-[80vw] ">
      <div>
        {detailUser &&
          detailUser.map((users) => (
            <div className="flex flex-row gap-4 rounded-2xl border-2 p-6 mt-3 w-[80vw]">
              <Avata width="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></Avata>
              <div className="flex flex-col">
                <p className="  font-semibold text-2xl">
                  {users.firstName} {users.lastName}
                </p>
                <div className="text-base">
                  <div className="flex flex-row">
                    <p>Follower: {users.following.length}</p>
                    <p className="ml-2">Following: {userFollowing}</p>
                  </div>
                  {postAuthor ? <p>Post: {postAuthor.length}</p> : <div></div>}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="">
        {postAuthor &&
          postAuthor.map((postData) => (
            <div className="rounded-2xl border-2 p-6 mt-3 w-[80vw] relative">
              <div>
                <div className="flex flex-row  mb-[20px]">
                  <Avata width="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></Avata>
                  <p className="ml-[10px] font-medium">
                    {postData.author.firstName} {} {postData.author.lastName}
                  </p>
                </div>
              </div>
              <p>{postData.title}</p>
              <div className="mt-[20px] mb-8">
                <img
                  className="block ml-auto mr-auto w-[60%] "
                  src={postData.cover}
                ></img>
              </div>

              <div>
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
                      <div>
                        <div>
                          <li>
                            <label
                              className="font-light text-black"
                              htmlFor="my-modal-4"
                              onClick={() => editPost(postData._id)}
                            >
                              Edit
                            </label>
                          </li>
                          <li>
                            <label
                              htmlFor="my-modal-3"
                              className="font-light text-black"
                              onClick={() => getPostId(postData._id)}
                            >
                              Delete
                            </label>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <PersonLikedPost
                  liked={postData.liked.length}
                ></PersonLikedPost>
                <div>{postData.comment}</div>
                <div className="flex flex-row justify-around mb-4 p-2 ">
                  {postData.liked.includes(authLogin) ? (
                    <div className="bg-white border rounded-xl h-[50px] w-[25vw] m-[2px] text-center">
                      <button
                        className="mt-3 text-blue-600/100 "
                        onClick={() => unLikePost(postData._id)}
                      >
                        <FaHeart className="ml-[47%] text-2xl" />
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white border rounded-xl h-[50px] w-[25vw] m-[2px] text-center">
                      <button
                        className="mt-3  text-blue-600/100 "
                        onClick={() => likePost(postData._id)}
                      >
                        <FaHeartBroken className="ml-[47%] text-2xl"></FaHeartBroken>
                      </button>
                    </div>
                  )}

                  <label
                    onClick={() => {
                      getPostId(postData._id, postData.author._id);
                    }}
                    className="border rounded-xl h-[50px] w-[25vw] m-[2px] bg-[#ffff] text-blue-600/100 text-center p-[10px]"
                    for="my-modal-5"
                  >
                    <FaFacebookMessenger className="ml-[47%] text-2xl"></FaFacebookMessenger>
                  </label>
                  <label>
                    <button
                      className="border rounded-xl h-[50px] w-[25vw] m-[2px] bg-[#ffff] text-blue-600/100"
                      onClick={() => getStore(postData.store)}
                    >
                      <FaStore className="ml-[47%] text-2xl"></FaStore>
                    </button>
                  </label>
                </div>
              </div>
            </div>
          ))}
        {!postAuthor ? (
          <div>
            <h1 className="text-center text-4xl font-bold mt-20">
              No Post Data
            </h1>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Comment postID={postId} authorId={authorId}></Comment>
      {/* Modal */}

      <div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative font-light text-black">
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
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};

export default AccountDetail;
