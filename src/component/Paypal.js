import { data } from "autoprefixer";
import { Action } from "history";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleCreateInvoice, handleCreateTransaction } from "../API/UserAPI";
import sendEmail from "../service/sendEmailService";
import { handleUpdateProduct } from "../API/UserAPI";

const PayPal = () => {
  const authLogin = useSelector((state) => state.auth);

  const stroreId = useSelector((state) => state.storeIdProduct.store_Id);
  const { state } = useLocation();
  const {
    nameProduct,
    addressProduct,
    phoneNumberProduct,
    totalQuantity,
    countProduct,
    priceProductData,
    productID,
  } = state;
  const paypal = useRef();
  const total = countProduct * priceProductData;
  const location = useLocation();
  const navigate = useNavigate();
  const storeEmail = stroreId;
  const email = authLogin.email;
  const paymentMethod = "PayPal";
  const ammount = total;

  const createInvoice = async (id) => {
    try {
      const name = nameProduct;
      const address = addressProduct;
      const phoneNumber = phoneNumberProduct;
      const email = authLogin.email;
      const quantityProduct = countProduct;
      const ammount = total;
      const paymentMethod = "PAYPAL";
      const productId = productID;
      const userId = authLogin.id;
      const transactionId = id;
      const payload = {
        name,
        address,
        phoneNumber,
        email,
        quantityProduct,
        ammount,
        paymentMethod,
        productId,
        userId,
        transactionId,
      };
      const newQuantity = totalQuantity - countProduct;

      const response = await handleCreateInvoice(payload);
      const updateQuantity = await handleUpdateProduct(productID, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: Paypal.js ~ line 53 ~ createInvoice ~ error",
        error
      );
    }
  };

  const createTransition = async (Id) => {
    try {
      const ammount = total;
      const status = "COMPLETE";
      const transactionId = Id;
      const payload = { ammount, status, transactionId };
      console.log(
        "🚀 ~ file: Paypal.js ~ line 66 ~ createTransition ~ payload2",
        payload
      );
      const response = await handleCreateTransaction(payload);
      return response;
    } catch (error) {}
  };

  const handleCreatePayPal = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Receipt",
                amount: {
                  currency_code: "CAD",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          const transictionId = data.orderID;
          const createTransaction = await createTransition(transictionId);

          const transaction = createTransaction.data._id;

          const response = await createInvoice(transaction);
          const createNewEmail = await sendEmail({
            email_store: { storeEmail },
            email_customer: { email },
            messageToCustomer: { paymentMethod, ammount },
          });

          navigate("/viewProcess");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  };

  useEffect(() => {
    handleCreatePayPal();
  }, []);
  return authLogin ? (
    <div>
      <div ref={paypal}></div>
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};

export default PayPal;
