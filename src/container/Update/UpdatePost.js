import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { useLocation } from "react-router-dom";
import { handleUpdatePost } from "../../API/UserAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadPicture from "../../service/upLoadPicture";
const schemaValidation = yup.object().shape({
  title: yup.string().required(),
});

const UpdatePostPage = () => {
  const { state } = useLocation();
  const { postId, payload } = state;
  const [picture, setPicture] = useState();
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
      debugger;
      if (picture) {
        const token = await uploadPicture(picture);
        console.log(
          "🚀 ~ file: UpdateProduct.js ~ line 36 ~ updateProduct ~ tonken",
          token
        );
        const pictureName = picture.name;
        const cover =
          process.env.React_App_Header_Firebase +
          pictureName +
          process.env.React_App_Footer_firebase +
          token;
        const postId = post;
        const title = data.title;
        const dataUpdate = { title, cover };

        const response = await handleUpdatePost(postId, dataUpdate);
      } else {
        const cover = payload.cover;

        const title = data.title;
        const dataUpdate = { title, cover };
        console.log(
          "🚀 ~ file: UpdatePost.js ~ line 52 ~ updatePost ~ dataUpdate",
          dataUpdate
        );

        const response = await handleUpdatePost(postId, dataUpdate);
      }

      navigate("/");
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdatePost.js ~ line 35 ~ updatePost ~ error",
        error
      );
    }
  };
  const handleGetURLPicture = (event) => {
    const file = event.target.files[0];

    setPicture(file);
  };

  return (
    <div className="rounded-2xl border-2 p-10 w-[80vw] flex flex-col mt-3 ">
      <form onSubmit={handleSubmit(updatePost)}>
        <div className="flex flex-col  gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">Update Post</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Title</p>{" "}
            <textarea
              id="TitleInput"
              className="textarea textarea-accent  w-[75vw] h-10"
              defaultValue={payload.title}
              {...register("title")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.title?.message}
            </span>
          </div>
          <div>
            <input type="file" onChange={handleGetURLPicture}></input>
          </div>
        </div>
        <div className="text-center">
          <button className="mr-3 border-4 rounded-md w-32 text-lg font-medium">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostPage;
