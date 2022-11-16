import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Redux/features/auth";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(setLoggedInUser(""));
    navigate("/login");
  };
  return (
    <div className="flex flex-row justify-between p-4 border-2 m-3 items-center">
      <div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-secondary w-80 max-w-xs"
        />
      </div>
      <div>
        <h4 className="font-extralight text-5xl mr-[160px]">ThaoLinhMaiDinh</h4>
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
            <a>View Profile</a>
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
