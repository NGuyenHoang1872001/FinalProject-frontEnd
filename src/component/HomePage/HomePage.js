import PostContainer from "../../container/postContainer";
import Navbar from "../../container/navbarContainer";
import SideBar from "../../container/sidebarContainer";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const location = useLocation();
  const dataLogin = useSelector((state) => state.auth);
  return Object.keys(dataLogin).length !== 0 ? (
    <div className="flex flex-col">
      <div className="">
        <Navbar></Navbar>
      </div>
      <div className=" flex flex-row ">
        <div className="">
          <SideBar></SideBar>
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default HomePage;
