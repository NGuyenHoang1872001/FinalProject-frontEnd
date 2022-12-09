import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { GoReport } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";

import { BiStore } from "react-icons/bi";

import { BsPlus } from "react-icons/bs";

import { MdOutlineAccountCircle } from "react-icons/md";
import { useLocation } from "react-router-dom";

import { TbFileInvoice, TbBrandGoogleAnalytics } from "react-icons/tb";
const SideBar = ({ theme }) => {
  console.log("🚀 ~ file: sidebarContainer.js:17 ~ SideBar ~ theme", theme);
  // const { state } = useLocation();
  // const { theme } = state;
  // console.log("🚀 ~ file: sidebarContainer.js:19 ~ SideBar ~ theme", theme);
  const authLoginRole = useSelector((state) => state.auth.role);
  console.log(
    "🚀 ~ file: sidebarContainer.js:6 ~ SideBar ~ authLoginRole",
    authLoginRole
  );
  // useEffect(() => {
  //   getUserRole();
  // }, []);
  return theme == "dark" ? (
    <div className="text-[#4dc39a] bg-black">
      <div className="  p-5 border-2 m-3 h-[70vh]">
        <ul className="menu  w-56 h-695vh] bg-black">
          <li className="hover-bordered">
            <Link to={"/"} className="font-bold">
              <AiOutlineHome></AiOutlineHome>
              {""}Home
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewOwnerStore"} className="font-bold">
              <BiStore></BiStore>
              {""}Store
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/createPost"} className="font-bold">
              <BsPlus></BsPlus>
              {""}Create Post
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/myOrder"} className="font-bold">
              <TbFileInvoice></TbFileInvoice>
              {""}My Order
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewAccount"} className="font-bold">
              <MdOutlineAccountCircle></MdOutlineAccountCircle>
              {""}Account
            </Link>
          </li>
          {authLoginRole == "admin" ? (
            <div>
              <li className="hover-bordered">
                <Link to={"/dashBoard"} className="font-bold">
                  <TbBrandGoogleAnalytics></TbBrandGoogleAnalytics>
                  {""}Dashboard
                </Link>
              </li>
              <li className="hover-bordered">
                <Link to={"/report"} className="font-bold">
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
  ) : (
    <div className="text-[#4dc39a]">
      <div className="  p-5 border-2 m-3 h-[70vh] ">
        <ul className="menu bg-base-100 w-56 h-[65vh]">
          <li className="hover-bordered">
            <Link to={"/"} className="font-bold">
              <AiOutlineHome></AiOutlineHome>
              {""}Home
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewOwnerStore"} className="font-bold">
              <BiStore></BiStore>
              {""}Store
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/createPost"} className="font-bold">
              <BsPlus></BsPlus>
              {""}Create Post
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/myOrder"} className="font-bold">
              <TbFileInvoice></TbFileInvoice>
              {""}My Order
            </Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewAccount"} className="font-bold">
              <MdOutlineAccountCircle></MdOutlineAccountCircle>
              {""}Account
            </Link>
          </li>
          {authLoginRole == "admin" ? (
            <div>
              <li>
                <Link to={"/dashBoard"} className="font-bold">
                  <TbBrandGoogleAnalytics></TbBrandGoogleAnalytics>
                  {""}Dashboard
                </Link>
              </li>
              <li>
                <Link to={"/report"} className="font-bold">
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
