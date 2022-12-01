import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { handleCreatePost } from "../../API/UserAPI";
import { useSelector } from "react-redux";
import { storage } from "../../service/fireBase";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleGetDownloadToken from "../../API/Firebase";

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
      if (picture != null) {
        const imageRef = ref(storage, `images/${picture.name}`);
        uploadBytes(imageRef, picture);
      }
      const pictureName = picture.name;
      const responseFirebase = await handleGetDownloadToken(pictureName);
      const token = responseFirebase.downloadTokens;
      const author = authLogin;
      const title = data.title;
      const cover =
        process.env.React_App_Header_Firebase +
        pictureName +
        process.env.React_App_Footer_firebase +
        token;
      const store = data.store;
      const payload = { author, title, cover, store };

      const response = await handleCreatePost(payload);

      navigate("/");
    } catch (error) {
      console.log(
        "🚀 ~ file: createPost.js ~ line 49 ~ createPost ~ error",
        error
      );
    }
  };
  const handleGetURLPicture = (event) => {
    const file = event.target.files[0];
    console.log(
      "🚀 ~ file: createPost.js ~ line 61 ~ handleGetURLPicture ~ file",
      file
    );

    setPicture(file);
  };
  return (
    <div className="rounded-2xl border-2 p-10 w-[80vw] flex flex-col mt-3 ">
      <form onSubmit={handleSubmit(createPost)}>
        <div className="flex flex-col  gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">Create Post</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-3"> Title</p>
            <textarea
              id="TitleInput"
              className="textarea textarea-accent  w-[75vw] h-10 "
              placeholder="Title"
              {...register("title")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {" "}
              {errors?.name?.message}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">StoreId</p>
            <textarea
              id="StoreInput"
              className="textarea textarea-accent  w-[75vw] h-10 "
              placeholder="Store"
              {...register("store")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {" "}
              {errors?.name?.message}
            </span>
          </div>

          <div>
            <input type="file" onChange={handleGetURLPicture}></input>
          </div>

          <div className="text-center">
            <button className="mr-3 border-4 rounded-md w-32 text-lg font-medium">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
