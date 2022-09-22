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

const SignIn = () => {
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
    const payload = { firstName, lastName, email, password };

    const response = await handleRegisterUser(payload);
    console.log(
      "🚀 ~ file: SignUpPage.js ~ line 33 ~ HandleRegister ~ response",
      response
    );
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center">
      <div className="ml-[70%]">
        <div className="ml-[80%] p-8">
          {"/login" && (
            <RouteLink to={"/login"}>
              <button className=" mr-3 border-4 rounded-md w-32 text-lg font-light ">
                Login
              </button>{" "}
            </RouteLink>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className=" border-4 rounded-md p-8 w-96 h-96 flex flex-col gap-6 h-70% items-center">
          <p className="text-3xl">Sign Up</p>
          <div>
            <p className="text-sm">FirstName</p>
            <input
              className="border rounder-lg w-80 p-2 mt-[10px]"
              placeholder="FirstName"
              {...register("firstName")}
            ></input>
            <span className="text-xs text-red">
              {errors?.firstName?.message}
            </span>
          </div>
          <div>
            <p lassName="text-sm">LastName</p>
            <input
              className="border rounder-xl w-80 p-2 mt-[10px]"
              placeholder="LastName"
              {...register("lastName")}
            ></input>
            <span className=" text-xs text-red">
              {errors?.lastName?.message}
            </span>
          </div>
          <div>
            <p lassName="text-sm">Email</p>
            <input
              className="border rounder-xl w-80 p-2 mt-[10px]"
              placeholder="Email"
              {...register("email")}
            ></input>
            <span className=" text-xs text-red">{errors?.email?.message}</span>
          </div>
          <div>
            <p lassName="text-sm">Password</p>
            <input
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
              className="mr-3 border-4 rounded-md w-32 text-lg font-light"
              type="submit"
            >
              SingUp
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
