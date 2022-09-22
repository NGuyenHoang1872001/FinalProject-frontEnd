const SideBar = () => {
  return (
    <div>
      <div className="  p-5 border-2 m-3 h-[100vh]">
        <ul className="menu bg-base-100 w-56">
          <li className="hover-bordered">
            <a>Home</a>
          </li>
          <li className="hover-bordered">
            <a>Product</a>
          </li>
          <li className="hover-bordered">
            <a>Fllowing </a>
          </li>
          <li className="hover-bordered">
            <a>Your Order</a>
          </li>
          <li className="hover-bordered">
            <a>Account</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
