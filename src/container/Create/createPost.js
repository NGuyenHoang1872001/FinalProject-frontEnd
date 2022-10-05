import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { handleCreatePost } from "../../API/UserAPI";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const schemaValidation = yup.object().shape({
  title: yup.string().required(),
  cover: yup.string().required(),
  store: yup.string(),
});

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const navigate = useNavigate();
  const authLogin = useSelector((state) => state.auth.id);
  const createPost = async (data) => {
    try {
      const author = authLogin;
      const title = data.title;
      const cover = data.cover;
      const store = data.store;
      const payload = { author, title, store };
      const response = await handleCreatePost(payload);
      navigate("/");
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit(createPost)}>
        <div>
          <textarea
            id="TitleInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Title"
            {...register("title")}
          ></textarea>
          <textarea
            id="CoverInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Cover"
            {...register("cover")}
          ></textarea>
          <textarea
            id="StoreInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Store"
            {...register("store")}
          ></textarea>
        </div>
        <div>
          <button>Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
