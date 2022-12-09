import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Redux/features/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleSearchUser } from "../API/UserAPI";
import { async } from "@firebase/util";
import { AiOutlineSearch } from "react-icons/ai";
import App from "../App";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const schemaValidation = yup.object().shape({
  searchInput: yup.string(),
});

const Navbar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(setLoggedInUser(""));
    navigate("/login");
  };

  const handleSearch = async (data) => {
    try {
      const query = data.searchInput;
      const response = await handleSearchUser(query);

      navigate("/searchPage", {
        state: {
          data: response,
        },
      });
    } catch (error) {}
  };

  return (
    <div className="flex flex-row justify-between p-4 border-2 m-3 items-center text-[#4dc39a] ">
      <div>
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="flex flex-row gap-3">
            <textarea
              id="TitleInput"
              type="text"
              className="input input-bordered input-secondary w-80 max-w-xs pt-3 "
              placeholder="Type here"
              {...register("searchInput")}
            ></textarea>

            <button className=" text-2xl  ">
              {" "}
              <AiOutlineSearch />
            </button>
          </div>
        </form>
      </div>
      <div className="">
        <h4 className="font-bold text-5xl mr-[160px]">Easy Meal</h4>
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0}>
          <div className="avatar">
            <div className="w-12  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>
              <Link to={"/updateUser"} className="font-bold">
                {" "}
                Edit Account
              </Link>
            </a>
          </li>
          <li>
            <button className="text-red" onClick={() => handleLogOut()}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
