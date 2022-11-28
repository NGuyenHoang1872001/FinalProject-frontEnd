import { useSelector } from "react-redux";
import {
  handleGetDetailUser,
  handleLike,
  handleUnLike,
} from "../../API/UserAPI";
import { useEffect, useState } from "react";
import {
  handleGetPostByAuthor,
  handleGetUserFollowing,
} from "../../API/UserAPI";
import Comment from "../../component/Comment/comment";
import Avata from "../../component/Avata";
import PersonLikedPost from "../../component/PersonLikedPost.js";
const AccountDetail = () => {
  const authLogin = useSelector((state) => state.auth.id);
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
  const [postId, setPostId] = useState([]);
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
  useEffect(() => {
    findDetailUser();
    getPostbyAuthor();
    handleGetFollowing();
  }, []);

  return (
    <div className="flex flex-col pl-[20px] pr-[20px] ">
      <div>
        {detailUser &&
          detailUser.map((users) => (
            <div className="flex flex-row gap-4 rounded-2xl border-2 p-6 mt-3">
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
            <div className="rounded-2xl border-2 p-6 mt-3">
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
                        className="border rounded-xl h-[50px] w-[30vw] m-[2px] bg-[#0f80f2] text-white"
                        onClick={() => unLikePost(postData._id)}
                      >
                        Like
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="border rounded-xl h-[50px] w-[30vw] m-[2px] bg-[#ffff] text-blue-600/100"
                        onClick={() => likePost(postData._id)}
                      >
                        Like
                      </button>
                    </div>
                  )}

                  <label
                    onClick={() => {
                      getPostId(postData._id);
                    }}
                    className="border rounded-xl h-[50px] w-[25vw] m-[2px] bg-[#ffff] text-blue-600/100 text-center p-[10px]"
                    for="my-modal-5"
                  >
                    Comment
                  </label>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Comment postID={postId}></Comment>
    </div>
  );
};

export default AccountDetail;
