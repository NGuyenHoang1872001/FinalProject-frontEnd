import { data } from "autoprefixer";
import { Action } from "history";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PayPal = () => {
  const { state } = useLocation();
  const { count, priceProduct } = state;
  const navigate = useNavigate();

  const paypal = useRef();
  const total = count * priceProduct;
  console.log("🚀 ~ file: Paypal.js ~ line 12 ~ PayPal ~ total", total);
  useEffect(() => {
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
          console.log("Successfull order" + order);
          navigate("/");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PayPal;
