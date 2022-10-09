import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { useLocation } from "react-router-dom";
import { handleUpdateStore } from "../../API/UserAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phoneNumber: yup.number().required(),
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

  const updateStore = async (data) => {
    try {
      const store = payload.storeId;

      const updateData = data;

      const response = await handleUpdateStore(updateData, store);
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
          <p>Name</p>
          <textarea
            id="TitleInput"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.name}
            {...register("name")}
          ></textarea>
          <span className="text-xs text-red">{errors?.name?.message}</span>
          <p>Email</p>
          <textarea
            id="email"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.email}
            {...register("email")}
          ></textarea>
          <span className="text-xs text-red">{errors?.email?.message}</span>
          <p>PhoneNumber</p>
          <textarea
            id="phoneNumber"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.phoneNumber}
            {...register("phoneNumber")}
          ></textarea>
          <span className="text-xs text-red">
            {errors?.phoneNumber?.message}
          </span>
        </div>

        <button>updateStore</button>
      </form>
    </div>
  );
};

export default UpdateStorePage;
