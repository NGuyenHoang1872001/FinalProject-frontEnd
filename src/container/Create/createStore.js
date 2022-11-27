import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { handleCreateStore } from "../../API/UserAPI";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phoneNumber: yup.number().required().min(0),
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
      const name = data.name;
      const email = data.email;
      const phoneNumber = data.phoneNumber;
      const payload = { name, email, phoneNumber, ownerId };
      console.log(
        "🚀 ~ file: createStore.js ~ line 33 ~ createStore ~ payload",
        payload
      );

      const response = await handleCreateStore(payload);
      navigate("/viewOwnerStore");
    } catch (error) {}
  };

  return (
    <div className="rounded-2xl border-2 p-10 w-[80vw] flex flex-col mt-3 ">
      <form onSubmit={handleSubmit(createStore)}>
        <div className="flex flex-col  gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">Create Store</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Store Name</p>
            <textarea
              id="NameInput"
              className="textarea textarea-accent  w-[75vw] h-10 "
              placeholder="Name"
              {...register("name")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {" "}
              {errors?.name?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Emai</p>
            <textarea
              id="EmailInput"
              className="textarea textarea-accent  w-[75vw] h-10"
              placeholder="Email"
              {...register("email")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.email?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">PhoneNumber</p>
            <textarea
              id="PhoneNumberInput"
              className="textarea textarea-accent   w-[75vw] h-10 "
              placeholder="PhoneNumber"
              {...register("phoneNumber")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.phoneNumber?.message}
            </span>
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

export default CreateStore;
