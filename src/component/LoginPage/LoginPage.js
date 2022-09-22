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
    <div className="flex flex-col items-center">
      <div className="ml-[80%] p-8">
        {"/singUp" && (
          <RouteLink to={"/signUp"}>
            <button className=" border-4 rounded-md w-32 text-lg font-light">
              SignUp
            </button>{" "}
          </RouteLink>
        )}
      </div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className=" border-4 rounded-md p-8 w-96 h-96 flex flex-col items-center gap-6  ">
          <p className="text-3xl">Welcome Back</p>
          <div>
            <p className="text-sm">Email</p>
            <input
              className="border rounder-xl w-80 p-2 "
              placeholder="EnterText"
              {...register("email")}
            ></input>
            <span className="text-xs text-red">{errors?.email?.message}</span>
          </div>

          <div>
            <p className="text-sm">Password</p>
            <input
              className="border rounder-xl w-80 p-2 "
              placeholder="EnterText"
              {...register("password")}
            ></input>
            <span className="text-xs text-red">
              {errors?.password?.message}
            </span>
          </div>
          <button
            className="mr-3 border-4 rounded-md w-32 text-lg font-light"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
