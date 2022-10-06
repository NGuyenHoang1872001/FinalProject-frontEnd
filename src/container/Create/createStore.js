import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { handleCreateStore } from "../../API/UserAPI";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const schemaValidation = yup.object().shape({
  title: yup.string().required(),
  cover: yup.string().required(),
});

const CreateStore = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const navigate = useNavigate();
  const authLogin = useSelector((state) => state.auth.id);
  const createStore = async (data) => {
    try {
      const ownerId = authLogin;
      const title = data.title;
      const cover = data.cover;
      const payload = { ownerId, title, cover };
      console.log(
        "🚀 ~ file: createStore.js ~ line 31 ~ createStore ~ payload",
        payload
      );
      const response = await handleCreateStore(payload);
      navigate("/viewOwnerStore");
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit(createStore)}>
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
        </div>
        <div>
          <button>Create Store</button>
        </div>
      </form>
    </div>
  );
};

export default CreateStore;
