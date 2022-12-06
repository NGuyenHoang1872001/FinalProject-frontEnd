import { VerticalBarChart } from "./verticalBarChart";
import {
  handleGetStoreMonthly,
  handleGetProductMonthly,
} from "../../API/UserAPI";
import { useQuery } from "react-query";
const StoreMonthly = () => {
  const { isLoading, error, data } = useQuery(
    "storeMonthly",
    handleGetStoreMonthly
  );
  const {
    isLoading: loading,
    error: errorProduct,
    data: dataProduct,
  } = useQuery("productMonthly", handleGetProductMonthly);

  if (isLoading)
    return (
      <p>
        <button class="btn loading">loading</button>
      </p>
    );
  if (error) return <p>..Something error</p>;

  if (loading)
    return (
      <p>
        <button class="btn loading">loading</button>
      </p>
    );
  if (errorProduct) return <p>..Something error</p>;
  return (
    <div>
      <input type="checkbox" id="my-modal-6" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
          <div class="modal-action">
            <label for="my-modal-6" class="btn">
              Close
            </label>
          </div>
          <VerticalBarChart
            storeData={data}
            productData={dataProduct}
          ></VerticalBarChart>
        </div>
      </div>
    </div>
  );
};
export default StoreMonthly;
