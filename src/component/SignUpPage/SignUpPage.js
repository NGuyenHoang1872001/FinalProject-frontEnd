import * as React from "react";
import "../../App.css";
import { Link as RouteLink } from "react-router-dom";
import { handleRegisterUser } from "../../API/UserAPI";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schemaValidation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const handleRegister = async (data) => {
    const { firstName, lastName, email, password } = data;
    const role = "user";
    const payload = { firstName, lastName, email, password, role };

    const response = await handleRegisterUser(payload);
    console.log(
      "🚀 ~ file: SignUpPage.js ~ line 33 ~ HandleRegister ~ response",
      response
    );
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center  bg-[url('https://firebasestorage.googleapis.com/v0/b/finalproject-8a79b.appspot.com/o/images%2Ffood-with-delivery-set-dishes-diet-top-view-free-space-your-text-black-background_187166-3087.jpg?alt=media&token=848f50c2-510e-4fb2-b5f6-c6ff05c8b610')] h-[100vh]">
      <div className="ml-[80%] p-8">
        {"/login" && (
          <RouteLink to={"/login"}>
            <button className=" h-12 rounded-md w-32 text-lg font-bold bg-[#ffff]  text-[#8CDE61] shadow-2xl ">
              Login
            </button>{" "}
          </RouteLink>
        )}
      </div>
      <div className="bg-[#ffff] hover:bg-[#ffff] rounded-2xl shadow-2xl h-[80vh]">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="  p-8 w-96 h-[85px] flex flex-col gap-6 items-center">
            <p className="text-3xl font-bold ">Sign Up</p>
            <div className="mb-[8px]">
              <p className="text-sm font-medium mb-3">FirstName</p>
              <input
                className="border rounder-lg w-80 p-2 mt-[10px]"
                placeholder="FirstName"
                {...register("firstName")}
              ></input>
              <span className="text-xs text-red">
                {errors?.firstName?.message}
              </span>
            </div>
            <div className="mb-[8px]">
              <p lassName="text-sm font-medium mb-3">LastName</p>
              <input
                className="border rounder-xl w-80 p-2 mt-[10px]"
                placeholder="LastName"
                {...register("lastName")}
              ></input>
              <span className=" text-xs text-red">
                {errors?.lastName?.message}
              </span>
            </div>
            <div className="mb-[8px]">
              <p lassName="text-sm font-medium mb-3">Email</p>
              <input
                className="border rounder-xl w-80 p-2 mt-[10px]"
                placeholder="Email"
                {...register("email")}
              ></input>
              <span className=" text-xs text-red">
                {errors?.email?.message}
              </span>
            </div>
            <div className="mb-[8px]">
              <p lassName="text-sm font-medium mb-3">Password</p>
              <input
                type="password"
                className="border rounder-xl w-80 p-2 mt-[10px]"
                placeholder="Password"
                {...register("password")}
              ></input>
              <span className=" text-xs text-red">
                {errors?.password?.message}
              </span>
            </div>

            <div>
              <button
                className="mr-3 border-4 rounded-md w-32 text-lg font-medium"
                type="submit"
              >
                SingUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
