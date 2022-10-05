import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { useLocation } from "react-router-dom";
import { handleUpdatePost } from "../../API/UserAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const schemaValidation = yup.object().shape({
  title: yup.string().required(),
  cover: yup.string().required(),
  store: yup.string().required(),
});

const UpdatePostPage = () => {
  const { state } = useLocation();
  const { postId, payload } = state;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const post = postId;
  const updatePost = async (data) => {
    try {
      const postId = post;

      const payload = data;
      const response = await handleUpdatePost(payload, postId);
      navigate("/");
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdatePost.js ~ line 35 ~ updatePost ~ error",
        error
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(updatePost)}>
        <div>
          <textarea
            id="TitleInput"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.title}
            {...register("title")}
          ></textarea>
          <textarea
            id="CoverInput"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.cover}
            {...register("cover")}
          ></textarea>
          <textarea
            id="StoreInput"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.store}
            {...register("store")}
          ></textarea>
        </div>
        <div>
          <button>Update Post</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostPage;
