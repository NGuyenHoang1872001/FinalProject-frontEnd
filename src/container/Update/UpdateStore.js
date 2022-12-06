import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { useLocation } from "react-router-dom";
import { handleUpdateStore } from "../../API/UserAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phoneNumber: yup.number().required().min(0),
});

const UpdateStorePage = () => {
  const { state } = useLocation();
  const location = useLocation();
  const { payload } = state;
  const dataLogin = useSelector((state) => state.auth.id);
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

  return dataLogin ? (
    <div className="rounded-2xl border-2 p-10 w-[80vw] flex flex-col mt-3 ">
      <form onSubmit={handleSubmit(updateStore)}>
        <div className="flex flex-col  gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">Update Store</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Name</p>
            <textarea
              id="TitleInput"
              className="textarea textarea-accent  w-[75vw] h-10 "
              defaultValue={payload.name}
              {...register("name")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.name?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Email</p>
            <textarea
              id="email"
              className="textarea textarea-accent  w-[75vw] h-10"
              defaultValue={payload.email}
              {...register("email")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.email?.message}
            </span>
          </div>
          <div lassName="flex flex-col">
            <p className="text-sm font-medium mb-3">PhoneNumber</p>
            <textarea
              id="phoneNumber"
              className="textarea textarea-accent   w-[75vw] h-10 "
              defaultValue={payload.phoneNumber}
              {...register("phoneNumber")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.phoneNumber?.message}
            </span>
          </div>
          <div className="text-center">
            <button className="mr-3 border-4 rounded-md w-32 text-lg font-medium">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};

export default UpdateStorePage;
