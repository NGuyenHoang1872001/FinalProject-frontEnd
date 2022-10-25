import { Link } from "react-router-dom";
const SideBar = () => {
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
            <a>Fllowing </a>
          </li>
          <li className="hover-bordered">
            <a>Your Order</a>
          </li>
          <li className="hover-bordered">
            <Link to={"/viewAccount"}>Account</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
