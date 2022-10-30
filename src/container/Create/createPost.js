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
  const [picture, setPicture] = useState();

  const authLogin = useSelector((state) => state.auth.id);
  const createPost = async (data) => {
    try {
      const author = authLogin;
      const title = data.title;
      const cover = picture.preview;
      const store = data.store;
      const payload = { author, title, cover, store };
      console.log(
        "🚀 ~ file: createPost.js ~ line 35 ~ createPost ~ payload",
        payload
      );
      const response = await handleCreatePost(payload);
      navigate("/");
    } catch (error) {}
  };
  const handleGetURLPicture = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setPicture(file);
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
            id="StoreInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Store"
            {...register("store")}
          ></textarea>
        </div>
        <div>
          <input type="file" onChange={handleGetURLPicture}></input>
        </div>

        <div>
          <button>Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
