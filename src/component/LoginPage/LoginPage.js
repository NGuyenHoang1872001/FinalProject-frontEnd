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

  const handleLogin = async (data) => {
    try {
      const { email, password } = data;
      const payload = { email, password };

      const response = await handleLoginUser(payload);
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
    <div className="flex flex-col items-center bg-[#8CDE61] hover:bg-[#8CDE61] h-[100vh]">
      <div className="ml-[80%] p-8 ">
        {"/singUp" && (
          <RouteLink to={"/signUp"}>
            <button className=" h-12 rounded-md w-32 text-lg font-bold bg-[#ffff]  text-[#8CDE61] shadow-2xl ">
              SignUp
            </button>{" "}
          </RouteLink>
        )}
      </div>
      <div className="bg-[#ffff] hover:bg-[#ffff] rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="  p-8 w-96 h-100 flex flex-col items-center gap-6  ">
            <p className="text-3xl font-bold">Welcome Back</p>
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
