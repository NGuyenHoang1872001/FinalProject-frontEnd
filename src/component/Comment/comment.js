import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleGetOnePost } from "../../API/UserAPI";
import { handleGetComment } from "../../API/UserAPI";
import {
  handleCreateComment,
  handleReplyComment,
  handleGetReplyByComment,
} from "../../API/UserAPI";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { data } from "autoprefixer";
import Avata from "../Avata";
import { useRef } from "react";

const schemaValidation = yup.object().shape({
  comment: yup.string(),
  reply: yup.string(),
  commentId: yup.string(),
});
const Comment = ({ postID, authorId }) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const ref = useRef(null);
  const authLogin = useSelector((state) => state.auth.id);

  const [dataPost, setDataPost] = useState([]);
  const [commentData, setCommentData] = useState([]);

  const getPostData = async () => {
    const response = await handleGetOnePost(postID);

    setDataPost(response);
  };
  const getAllComment = async () => {
    try {
      const response = await handleGetComment(postID);
      setCommentData(response);
    } catch (error) {}
  };
  const createComment = async (data) => {
    try {
      const comment = data.comment;
      const author = authLogin;
      const postId = postID;
      const payload = { comment, author, postId };
      const createNewConmment = await handleCreateComment(payload);
      getAllComment();
    } catch (error) {
      console.log(
        "🚀 ~ file: comment.js ~ line 49 ~ createComment ~ error",
        error
      );
    }
  };
  const [replyStatus, setReplyStatus] = useState(false);
  const [commentID, setCommentID] = useState();
  console.log(
    "🚀 ~ file: comment.js ~ line 63 ~ Comment ~ commentID",
    commentID
  );
  const [replyData, setReplyData] = useState([]);

  const handleReplyInput = async (commentId) => {
    try {
      setReplyStatus(true);
      setCommentID(commentId);
      getReplyComment(commentId);
    } catch (error) {
      console.log(
        "🚀 ~ file: comment.js ~ line 67 ~ handleReplyInput ~ error",
        error
      );
    }
  };

  const handleCloseReplyInput = async () => {
    try {
      setReplyStatus(false);
    } catch (error) {}
  };

  const getReplyComment = async (commentId) => {
    try {
      if (commentId) {
        // const commentId = commentID;
        const response = await handleGetReplyByComment(commentId);
        setReplyData(response);
      }
    } catch (error) {}
  };

  const createReply = async (data) => {
    try {
      const commentId = commentID;
      const author = authLogin;
      const reply = data.reply;
      const payload = { commentId, author, reply };

      const creatNewReply = await handleReplyComment(payload);
      getReplyComment(commentId);
    } catch (error) {
      console.log(
        "🚀 ~ file: comment.js ~ line 95 ~ createReply ~ error",
        error
      );
    }
  };

  useEffect(() => {
    getAllComment();
    getPostData();
    getReplyComment();
  }, [postID]);
  return (
    <div>
      <div>
        <input type="checkbox" id="my-modal-5" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box w-11/12 max-w-5xl h-[90vh]">
            <div class="modal-action">
              <label
                for="my-modal-5"
                class="btn"
                onClick={handleCloseReplyInput}
              >
                X
              </label>
            </div>
            <div>
              <div>
                <img
                  src={dataPost.cover}
                  className="block ml-auto mr-auto w-[60%] "
                ></img>
              </div>
              <div className="">
                <div className="m-3 flex justify-center  ">
                  <form onSubmit={handleSubmit(createComment)}>
                    <div className="flex flex-row">
                      <input
                        ref={ref}
                        type="text"
                        placeholder="Comment"
                        className="input input-bordered w-[40vw] mr-2"
                        {...register("comment")}
                      />
                      <button class="btn btn-accent">Comment</button>
                    </div>
                  </form>
                </div>
                <div>
                  {commentData &&
                    commentData.map((Comment) => (
                      <div className="flex flex-col m-5">
                        <div className="flex flex-row ">
                          <div className="avatar">
                            <div className="w-8  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src="https://placeimg.com/192/192/people" />
                            </div>
                          </div>
                          <div>
                            <p className="ml-[10px] font-medium">
                              {Comment.author.firstName}{" "}
                              {Comment.author.lastName}
                            </p>
                          </div>
                        </div>
                        <p className="ml-10 border rounded-3xl p-3 bg-[#C8C8C8]">
                          {Comment.comment}
                        </p>
                        <div>
                          {replyStatus == false && authLogin == authorId ? (
                            <div className="text-right">
                              {" "}
                              <button
                                className="btn btn-xs"
                                onClick={() => handleReplyInput(Comment._id)}
                              >
                                Reply
                              </button>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div>
                          {replyStatus == true && commentID == Comment._id ? (
                            <div className="flex flex-col">
                              <form onSubmit={handleSubmit(createReply)}>
                                <div className="flex flex-row mt-2 ml-14">
                                  <input
                                    type="text"
                                    className="input input-bordered w-[65vw] h-10 ml-2"
                                    placeholder="Enter Reply"
                                    {...register("reply")}
                                  />
                                  <button class="ml-2 text-blue-600/50">
                                    Reply
                                  </button>
                                </div>
                              </form>
                              <div>
                                {replyData &&
                                  replyData.map((reply) => (
                                    <div>
                                      {reply.commentId == Comment._id ? (
                                        <div>
                                          {reply.author.map((user) => (
                                            <div className=" flex flex-col m-5 ml-12">
                                              <div className="flex flex-row">
                                                <Avata width="w-8  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></Avata>{" "}
                                                <p className="ml-[10px] font-medium">
                                                  {user.firstName}
                                                  {} {user.lastName}
                                                </p>
                                              </div>

                                              <p className="ml-10 border rounded-3xl p-3 bg-[#C8C8C8] w-[65vw]">
                                                {reply.reply}
                                              </p>
                                            </div>
                                          ))}
                                          <div></div>
                                        </div>
                                      ) : (
                                        <div></div>
                                      )}
                                    </div>
                                  ))}
                              </div>
                              <button
                                className="btn btn-link"
                                onClick={handleCloseReplyInput}
                              >
                                Click to minimize
                              </button>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
