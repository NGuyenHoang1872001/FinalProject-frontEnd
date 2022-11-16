import { useNavigate } from "react-router-dom";
const ViewProcess = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="flex flex-col text-center w-[80vw]  h-[100vh] bg-gradient-to-r from-cyan-500 to-blue-500 ">
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
  );
};
export default ViewProcess;
