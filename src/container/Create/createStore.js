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
  phoneNumber: yup.number().required(),
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
    <div>
      <form onSubmit={handleSubmit(createStore)}>
        <div>
          <textarea
            id="NameInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Name"
            {...register("name")}
          ></textarea>
          <textarea
            id="EmailInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Email"
            {...register("email")}
          ></textarea>
          <textarea
            id="PhoneNumberInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="PhoneNumber"
            {...register("phoneNumber")}
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
