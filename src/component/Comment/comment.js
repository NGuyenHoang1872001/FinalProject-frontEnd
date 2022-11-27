import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleGetOnePost } from "../../API/UserAPI";
import { handleGetComment } from "../../API/UserAPI";
import { handleCreateComment } from "../../API/UserAPI";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { async } from "@firebase/util";
const schemaValidation = yup.object().shape({
  comment: yup.string().required(),
});
const Comment = ({ postID }) => {
  const PostId = postID;
  console.log("🚀 ~ file: comment.js ~ line 15 ~ Comment ~ PostId", PostId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const authLogin = useSelector((state) => state.auth.id);

  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  console.log(
    "🚀 ~ file: comment.js ~ line 27 ~ Comment ~ commentData",
    commentData
  );

  const getPostData = async () => {
    const response = await handleGetOnePost(postID);

    setData(response);
  };
  const getAllComment = async () => {
    try {
      const response = await handleGetComment(postID);
      console.log(
        "🚀 ~ file: comment.js ~ line 19 ~ getAllComment ~ response",
        response
      );
      setCommentData(response);
    } catch (error) {}
  };
  const createComment = async (data) => {
    try {
      const comment = data.comment;
      const author = authLogin;
      const postId = postID;
      const payload = { comment, author, postId };
      console.log(
        "🚀 ~ file: comment.js ~ line 44 ~ createComment ~ payload",
        payload
      );
      const createNewConmment = await handleCreateComment(payload);
      getAllComment();
    } catch (error) {
      console.log(
        "🚀 ~ file: comment.js ~ line 49 ~ createComment ~ error",
        error
      );
    }
  };
  useEffect(() => {
    getAllComment();
    getPostData();
  }, [postID]);
  return (
    <div>
      <div>
        <input type="checkbox" id="my-modal-5" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box w-11/12 max-w-5xl h-[90vh]">
            <div class="modal-action">
              <label for="my-modal-5" class="btn">
                ESC!
              </label>
            </div>
            <div>
              <div>
                <img
                  src={data.cover}
                  className="block ml-auto mr-auto w-[60%] "
                ></img>
              </div>
              <div>
                <div className="m-3 flex justify-center">
                  <form onSubmit={handleSubmit(createComment)}>
                    <div className="flex flex-row">
                      <input
                        type="text"
                        placeholder="Comment"
                        className="input input-bordered w-[50vw] mr-2"
                        clearable
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
