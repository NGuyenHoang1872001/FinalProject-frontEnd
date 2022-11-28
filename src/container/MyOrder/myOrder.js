import { handleGetInvoiceByUser } from "../../API/UserAPI";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { data } from "autoprefixer";
const MyOrderPage = () => {
  const [orderData, setOrderData] = useState([]);
  console.log(
    "🚀 ~ file: myOrder.js ~ line 6 ~ MyOrderPage ~ orderData",
    orderData
  );
  const authLogin = useSelector((state) => state.auth);
  console.log(
    "🚀 ~ file: myOrder.js ~ line 11 ~ MyOrderPage ~ authLogin",
    authLogin.id
  );
  const handleGetOrder = async () => {
    const getOrder = await handleGetInvoiceByUser(authLogin.id);
    setOrderData(getOrder);
  };

  useEffect(() => {
    handleGetOrder();
  }, []);
  return (
    <div>
      <p className="font-bold text-2xl">My Order History</p>
      <div className="flex flex-row flex-wrap justify-center  ">
        {" "}
        {orderData.data &&
          orderData.data.map((data) => (
            <div className=" m-[20px] rounded-2xl border-2 mt-5 ml-3 shadow-md w-[30vw] p-4 relative">
              <div className="text-center">
                <p className="font-bold ">Information Detail</p>
              </div>
              <div className="font-light">
                <p key={data._id}>Name: {data.name}</p>
                <p>Address: {data.address}</p>
                <p>PhoneNumber: {data.phoneNumber}</p>
                <p>Email: {data.email}</p>

                {data.productId &&
                  data.productId.map((dataProduct) => (
                    <p key={dataProduct._id}>nameProduct: {dataProduct.name}</p>
                  ))}
                <p>quantity:{data.quantityProduct}</p>
                <p>Ammount: {data.ammount} CAD</p>
                <p>Payment Method: {data.paymentMethod}</p>
                <p>Date: {data.createdAt}</p>
                <p>Status: {data.status}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default MyOrderPage;
