import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { useLocation } from "react-router-dom";
import { handleUpdateUser, handleGetDetailUser } from "../../API/UserAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const schemaValidation = yup.object().shape({
  firstName: yup.string(),
  LastName: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
  confirmPassword: yup.string(),
});

const UpdateUserPage = () => {
  const [userData, setUserData] = useState();
  const location = useLocation();
  const dataLogin = useSelector((state) => state.auth.id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const getUserData = async () => {
    try {
      const response = await handleGetDetailUser(dataLogin);
      setUserData(response.data);
    } catch (error) {}
  };
  const [checkPassword, setCheckPassword] = useState(true);
  console.log(
    "🚀 ~ file: UpdateUser.js:37 ~ UpdateUserPage ~ checkPassword",
    checkPassword
  );

  const updateUser = async (data) => {
    try {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.email;
      const password = data.password;
      const confirmPassword = data.confirmPassword;
      console.log(
        "🚀 ~ file: UpdateUser.js:49 ~ updateUser ~ confirmPassword",
        confirmPassword
      );
      if (password == confirmPassword) {
        setCheckPassword("true");
      }
      if (password != confirmPassword) {
        setCheckPassword("false");
      }
      if (checkPassword == "true") {
        const option = { firstName, lastName, email, password };
        console.log(
          "🚀 ~ file: UpdateUser.js:43 ~ updateUser ~ option",
          option
        );
        const response = await handleUpdateUser(dataLogin, option);
        console.log(
          "🚀 ~ file: UpdateUser.js:44 ~ updateUser ~ response",
          response
        );
        navigate("/");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdatePost.js ~ line 35 ~ updatePost ~ error",
        error
      );
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return dataLogin ? (
    <div className="rounded-2xl border-2 p-10 w-[80vw] flex flex-col mt-3 ">
      <form onSubmit={handleSubmit(updateUser)}>
        <div className="flex flex-col  gap-8">
          {userData &&
            userData.map((rows) => (
              <div>
                <div className="text-center">
                  <p className="text-3xl font-bold">Update User</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-medium mb-3">First Name</p>
                  <textarea
                    id="firstName"
                    className="textarea textarea-accent  w-[75vw] h-10 font-light text-black"
                    defaultValue={rows.firstName}
                    {...register("firstName")}
                  ></textarea>
                  <span className="text-xs text-red mt-2">
                    {errors?.firstName?.message}
                  </span>
                </div>
                <div lassName="flex flex-col">
                  <p className="text-sm font-medium mb-3">Last Name</p>
                  <textarea
                    id="lastName"
                    className="textarea textarea-accent   w-[75vw] h-10 font-light text-black "
                    defaultValue={rows.lastName}
                    {...register("lastName")}
                  ></textarea>
                  <span className="text-xs text-red mt-2">
                    {errors?.lastName?.message}
                  </span>
                </div>
                <div lassName="flex flex-col">
                  <p className="text-sm font-medium mb-3">Email</p>
                  <textarea
                    id="email"
                    className="textarea textarea-accent   w-[75vw] h-10 font-light text-black "
                    defaultValue={rows.email}
                    {...register("email")}
                  ></textarea>
                  <span className="text-xs text-red mt-2">
                    {errors?.email?.message}
                  </span>
                </div>
                <div lassName="flex flex-col">
                  <div>
                    <p className="text-sm font-medium mb-3">New Password</p>
                    <textarea
                      id="password"
                      className="textarea textarea-accent   w-[75vw] h-10 font-light text-black "
                      {...register("password")}
                    ></textarea>
                  </div>
                  <p className="text-sm font-medium mb-3">Confirm Password</p>
                  <textarea
                    id="password"
                    className="textarea textarea-accent   w-[75vw] h-10 font-light text-black "
                    {...register("confirmPassword")}
                  ></textarea>
                  <span className="text-xs text-red mt-2">
                    {errors?.confirmPassword?.message}
                  </span>
                  {checkPassword == "false" ? (
                    <span className="text-xs text-red mt-2">
                      Password is not match
                    </span>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="text-center">
                  <button className="mr-3 border-4 rounded-md w-32 text-lg font-medium">
                    Update
                  </button>
                </div>
              </div>
            ))}
        </div>
      </form>
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};

export default UpdateUserPage;
