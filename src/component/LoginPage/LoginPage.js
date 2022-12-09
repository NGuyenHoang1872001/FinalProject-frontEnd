import * as React from "react";
import "../../App.css";
import routerData from "../../menuData/RouterData";
import Link from "../Link";
import { Link as RouteLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { handleLoginUser } from "../../API/UserAPI";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../Redux/features/auth";
import { useState } from "react";

const schemaValidation = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const [error, setError] = useState();
  console.log("🚀 ~ file: LoginPage.js:32 ~ Login ~ error", error);

  const handleLogin = async (data) => {
    try {
      const { email, password } = data;
      const payload = { email, password };

      const response = await handleLoginUser(payload);
      console.log(
        "🚀 ~ file: LoginPage.js:38 ~ handleLogin ~ response",
        response
      );
      if (!response) return setError("something Wrong");
      const { token, payload: loggedInData } = response.data;
      dispatch(setLoggedInUser(loggedInData));

      if (!token) return;
      localStorage.setItem("access_token", token);

      navigate("/");
    } catch (error) {
      console.log(
        "🚀 ~ file: LoginPage.js ~ line 42 ~ handleLogin ~ error",
        error
      );
    }
  };
  return (
    <div className="flex flex-col items-center  h-[100vh] bg-[url('https://firebasestorage.googleapis.com/v0/b/finalproject-8a79b.appspot.com/o/images%2Ffood-with-delivery-set-dishes-diet-top-view-free-space-your-text-black-background_187166-3087.jpg?alt=media&token=848f50c2-510e-4fb2-b5f6-c6ff05c8b610')]">
      <div className="ml-[80%] p-8 ">
        {"/register" && (
          <RouteLink to={"/register"}>
            <button className=" h-12 rounded-md w-32 text-lg font-bold bg-[#ffff]  text-[#8CDE61] shadow-2xl ">
              Register
            </button>{" "}
          </RouteLink>
        )}
      </div>
      <div className="bg-[#ffff] hover:bg-[#ffff] rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="  p-8 w-96 h-100 flex flex-col items-center gap-6  ">
            <p className="text-3xl font-bold">Welcome Back</p>
            {error ? <p className="text-xs text-red">{error}</p> : <p></p>}

            <div className="mb-[8px]">
              <p className="text-sm font-medium mb-3">Email</p>
              <input
                className="border rounder-2xl w-80 p-2 "
                placeholder="Enter Email"
                {...register("email")}
              ></input>
              <span className="text-xs text-red">{errors?.email?.message}</span>
            </div>

            <div className="mb-[8px]">
              <p className="text-sm font-medium mb-3">Password</p>
              <input
                type="password"
                className="border rounder-2xl w-80 p-2 "
                placeholder="Enter Password"
                {...register("password")}
              ></input>
              <span className="text-xs text-red">
                {errors?.password?.message}
              </span>
            </div>
            <button
              className="mr-3 border-4 rounded-md w-32 text-lg font-medium"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
