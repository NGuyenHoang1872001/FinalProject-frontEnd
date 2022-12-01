import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
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
    <div>
      <div className="  p-5 border-2 m-3 h-[100vh]">
        <ul className="menu bg-base-100 w-56">
          <li className="hover-bordered">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewOwnerStore"}>Store</Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/createPost"}>Create Post</Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/myOrder"}>My Order</Link>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewAccount"}>Account</Link>
          </li>
          {authLoginRole == "admin" ? (
            <div>
              <li>
                <Link to={""}>Dashboard</Link>
              </li>
              <li>
                <Link to={""}>Create Admin</Link>
              </li>
              <li>
                <Link to={""}>Report Post</Link>
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
