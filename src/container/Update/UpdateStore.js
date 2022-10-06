import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { useLocation } from "react-router-dom";
import { handleUpdateStore } from "../../API/UserAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const schemaValidation = yup.object().shape({
  title: yup.string().required(),
  cover: yup.string().required(),
});

const UpdateStorePage = () => {
  const { state } = useLocation();
  const { payload } = state;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const store = payload.storeId;
  const updateStore = async (data) => {
    try {
      const storeId = store;

      const payload = data;

      const response = await handleUpdateStore(payload, storeId);
      navigate("/viewOwnerStore");
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdatePost.js ~ line 35 ~ updatePost ~ error",
        error
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(updateStore)}>
        <div>
          <p>title</p>
          <textarea
            id="TitleInput"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.title}
            {...register("title")}
          ></textarea>
          <p>cover</p>
          <textarea
            id="CoverInput"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.cover}
            {...register("cover")}
          ></textarea>
        </div>
        <div>
          <button>Update Store</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStorePage;
