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
