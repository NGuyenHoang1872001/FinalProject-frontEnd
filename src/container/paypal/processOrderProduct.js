import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ViewProcess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataLogin = useSelector((state) => state.auth.id);

  const navigateToHome = () => {
    navigate("/");
  };
  return dataLogin ? (
    <div>
      <div className=" flex flex-col text-center w-[80vw]  h-[100vh]  rounded-2xl border-2 mt-3 ">
        <div className="mt-[200px]">
          <div>
            <h1 className="text-[50px] font-[600] mb-[40px]">
              Your order SuccessFully
            </h1>
          </div>
          <div className="mb-[50px]">
            <ul class="steps">
              <li class="step step-primary">Order</li>
              <li class="step step-primary">Prepare Order</li>
              <li class="step">Delivery in progress</li>
              <li class="step">Receive Product</li>
            </ul>
          </div>
          <div>
            <button onClick={navigateToHome} class="btn glass">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};
export default ViewProcess;
