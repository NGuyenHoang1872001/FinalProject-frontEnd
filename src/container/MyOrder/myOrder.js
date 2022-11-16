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
      {orderData.data &&
        orderData.data.map((data) => (
          <div>
            <p key={data._id}>name: {data.name}</p>
            <p>address: {data.address}</p>
            <p>phoneNumber: {data.phoneNumber}</p>
            <p>email: {data.email}</p>

            {data.productId &&
              data.productId.map((dataProduct) => (
                <p key={dataProduct._id}>nameProduct: {dataProduct.name}</p>
              ))}
            <p>quantity:{data.quantityProduct}</p>
            <p>Ammount: {data.ammount} CAD</p>
            <p>Payment Method: {data.paymentMethod}</p>
            <p>Date: {data.createdAt}</p>
          </div>
        ))}
    </div>
  );
};
export default MyOrderPage;
