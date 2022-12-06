import { useSelector, useDispatch } from "react-redux";
import {
  handleGetDetailUser,
  handleLike,
  handleUnLike,
} from "../../API/UserAPI";
import { useEffect, useState } from "react";
import {
  handleGetPostByAuthor,
  handleGetUserFollowing,
  handleFollowingUser,
  handleUnFollowingUser,
} from "../../API/UserAPI";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";

import { FaStore } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../../component/Comment/comment";
import Avata from "../../component/Avata";
import PersonLikedPost from "../../component/PersonLikedPost.js";
import { setStoreIdProduct } from "../../Redux/features/storeIdProduct";

const AccountDetailUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authLogin = useSelector((state) => state.auth.id);
  const { state } = useLocation();
  const { userId } = state;

  const [detailUser, setDetailUSer] = useState();

  const [postAuthor, setPostAuthor] = useState();

  const [userFollowing, setUserFollowing] = useState();

  const getPostbyAuthor = async () => {
    try {
      const response = await handleGetPostByAuthor(userId);
      setPostAuthor(response);
    } catch (error) {}
  };
  const handleGetFollowing = async () => {
    try {
      const id = userId;
      const response = await handleGetUserFollowing(id);
      setUserFollowing(response.length);
    } catch (error) {}
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
  const findDetailUser = async () => {
    try {
      const getDetailUser = await handleGetDetailUser(userId);

      setDetailUSer(getDetailUser.data);
    } catch (error) {}
  };
  const [accountDetail, setAccountDetail] = useState();

  const findDetailOwner = async () => {
    try {
      const getDetailUser = await handleGetDetailUser(authLogin);

      setAccountDetail(getDetailUser.data);
    } catch (error) {}
  };
  const likePost = async (postId) => {
    try {
      const like = await handleLike(postId, authLogin);
      getPostbyAuthor();
    } catch (error) {
      console.log(
        "🚀 ~ file: AccountDetailUser.js ~ line 50 ~ likePost ~ error",
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
        "🚀 ~ file: AccountDetailUser.js ~ line 61 ~ unLikePost ~ error",
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
  const addFollowing = async () => {
    try {
      const addFollowing = await handleFollowingUser(userId, authLogin);
      findDetailUser();
    } catch (error) {
      console.log(
        "🚀 ~ file: storeContainer.js ~ line 58 ~ addFollowing ~ error",
        error
      );
    }
  };
  const addUnFollowing = async () => {
    try {
      const addUnFollowing = await handleUnFollowingUser(userId, authLogin);
      findDetailUser();
    } catch (error) {
      console.log(
        "🚀 ~ file: storeContainer.js ~ line 58 ~ addFollowing ~ error",
        error
      );
    }
  };
  useEffect(() => {
    findDetailOwner();
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
              <div>
                {users._id == authLogin ? (
                  <div></div>
                ) : (
                  <div>
                    {accountDetail &&
                      accountDetail.map((account) => (
                        <div>
                          {users.following.includes(account._id) ? (
                            <div className="text-center">
                              <button
                                className="border rounded-xl h-[30px] w-[20vw] m-[2px] bg-[#0f80f2] text-white"
                                onClick={() => addUnFollowing()}
                              >
                                Following
                              </button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <button
                                className="border rounded-xl h-[30px] w-[20vw] m-[2px] bg-[#ffff] text-blue-600/100"
                                onClick={() => addFollowing()}
                              >
                                Following
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    {}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="">
        {postAuthor &&
          postAuthor.map((postData) => (
            <div className="rounded-2xl border-2 p-6 mt-3 w-[80vw] ">
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
                <div></div>
                <PersonLikedPost
                  liked={postData.liked.length}
                ></PersonLikedPost>
                <div>{postData.comment}</div>
                <div className="flex flex-row justify-around mb-4 p-2 ">
                  {postData.liked.includes(authLogin) ? (
                    <div>
                      <button
                        className="border rounded-xl h-[50px] w-[30vw] m-[2px]  text-blue-600/100 "
                        onClick={() => unLikePost(postData._id)}
                      >
                        <FaHeart className="ml-[47%] text-2xl" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="border rounded-xl h-[50px] w-[30vw] m-[2px]  text-blue-600/100 "
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
                  <button
                    className="border rounded-xl h-[50px] w-[25vw] m-[2px] bg-[#ffff] text-blue-600/100"
                    onClick={() => getStore(postData.store)}
                  >
                    <FaStore className="ml-[47%] text-2xl"></FaStore>
                  </button>
                </div>
              </div>
            </div>
          ))}{" "}
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
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};

export default AccountDetailUser;
