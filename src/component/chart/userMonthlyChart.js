import LineChart from "./lineChart";
import { handleGetUserMonthly } from "../../API/UserAPI";
import { useQuery } from "react-query";
const UserMonthly = () => {
  const { isLoading, error, data } = useQuery(
    "userMonthly",
    handleGetUserMonthly
  );
  if (isLoading)
    return (
      <p>
        <button class="btn loading">loading</button>
      </p>
    );
  if (error) return <p>..Something error</p>;
  return (
    <div>
      <input type="checkbox" id="my-modal-5" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
          <LineChart userData={data}></LineChart>
          <div class="modal-action">
            <label for="my-modal-5" class="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserMonthly;
