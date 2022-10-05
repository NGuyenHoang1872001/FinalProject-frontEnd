import "../App.css";
import Link from "../component/Link";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Aside from "../component/Aside";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  const authLogin = useSelector((state) => state.auth);

  return Object.keys(authLogin).length !== 0 ? (
    <div className="App">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="bodyCSS">
        <div className="asideCSS">
          <Aside></Aside>
        </div>
        <div className="postCSS">
          <Outlet />
        </div>
      </div>
      <Footer> </Footer>
      <div></div>
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default Main;
