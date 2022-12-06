import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { GoReport } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";

import { BiStore } from "react-icons/bi";

import { BsPlus } from "react-icons/bs";

import { MdOutlineAccountCircle } from "react-icons/md";

import { TbFileInvoice, TbBrandGoogleAnalytics } from "react-icons/tb";
const SideBar = () => {
  const authLoginRole = useSelector((state) => state.auth.role);
  console.log(
    "🚀 ~ file: sidebarContainer.js:6 ~ SideBar ~ authLoginRole",
    authLoginRole
  );
  // useEffect(() => {
  //   getUserRole();
  // }, []);
  return (
    <div className="text-[#4dc39a]">
      <div className="  p-5 border-2 m-3 h-[100vh]">
        <ul className="menu bg-base-100 w-56">
          <li className="hover-bordered">
            <Link to={"/"}>
              <AiOutlineHome></AiOutlineHome>
              {""}Home
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewOwnerStore"}>
              <BiStore></BiStore>
              {""}Store
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/createPost"}>
              <BsPlus></BsPlus>
              {""}Create Post
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/myOrder"}>
              <TbFileInvoice></TbFileInvoice>
              {""}My Order
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewAccount"}>
              <MdOutlineAccountCircle></MdOutlineAccountCircle>
              {""}Account
            </Link>
          </li>
          {authLoginRole == "admin" ? (
            <div>
              <li>
                <Link to={"/dashBoard"}>
                  <TbBrandGoogleAnalytics></TbBrandGoogleAnalytics>
                  {""}Dashboard
                </Link>
              </li>
              <li>
                <Link to={"/report"}>
                  <GoReport></GoReport>
                  {""}Report Post
                </Link>
              </li>
            </div>
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
