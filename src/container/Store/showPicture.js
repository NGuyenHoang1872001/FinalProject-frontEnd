import { useEffect, useState } from "react";
import {
  handleGetInvoiceByProduct,
  handleUpdateInvoice,
} from "../../API/UserAPI";
const ShowPicture = ({ cover, id }) => {
  const [urlPicture, setUrlPicture] = useState([]);
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: showPicture.js ~ line 6 ~ ShowPicture ~ data", data);

  const getPicture = () => {
    try {
      const url = cover;

      setUrlPicture(url);
    } catch (error) {
      console.log(
        "🚀 ~ file: showPicture.js ~ line 12 ~ getPicture ~ error",
        error
      );
    }
  };

  const getInvoice = async () => {
    try {
      const product = id;
      console.log(
        "🚀 ~ file: showPicture.js ~ line 24 ~ getInvoice ~ product",
        product
      );
      const response = await handleGetInvoiceByProduct(product);
      setData(response);
    } catch (error) {}
  };
  const handleUpdateStatus = async (invoiceId) => {
    try {
      const status = "Delivering";
      const option = { status };
      const response = await handleUpdateInvoice(invoiceId, option);
      getInvoice();
    } catch (error) {}
  };
  useEffect(() => {
    getPicture();
    getInvoice();
  }, [cover]);
  return (
    <div>
      <input type="checkbox" id="my-modal-5" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl h-[90vh]">
          <div class="modal-action">
            <label for="my-modal-5" class="btn">
              Yay!
            </label>
          </div>

          <div>
            <img
              src={urlPicture}
              className="block ml-auto mr-auto w-[60%] "
            ></img>
          </div>
          <div>
            {data &&
              data.map((invoice) => (
                <div className="rounded-2xl border-2 p-4 mt-[10px]">
                  <div className="flex flex-row justify-between">
                    <div>
                      <p>Name: {invoice.name}</p>
                      <p>Email: {invoice.email}</p>
                      <p>PhoneNumber: +84 {invoice.phoneNumber}</p>
                    </div>
                    {invoice.status == "Preparing" ? (
                      <div>
                        <button
                          className="btn btn-info"
                          onClick={() => handleUpdateStatus(invoice._id)}
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button className="btn btn-active btn-ghost">
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPicture;
