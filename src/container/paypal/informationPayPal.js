import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Paypal from "../../component/Paypal";
import InputForm from "../../component/input/input";

const InfoCustomer = () => {
  const { state } = useLocation();
  const { quantityProduct, priceProduct } = state;
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [checkout, setCheckOut] = useState(false);

  const increase = (count) => {
    try {
      if (count < quantityProduct) {
        setCount(Number(count) + 1);
      }
    } catch (error) {}
  };
  const reduced = (number) => {
    try {
      if (number > 0) {
        setCount(Number(number) - 1);
      }
    } catch (error) {}
  };
  const PayPal = () => {
    navigate("/payPal", {
      state: { count: count, priceProduct: priceProduct },
    });
  };

  return (
    <div>
      <InputForm title={"Name"} inputName={"Enter Name"}></InputForm>
      <InputForm title={"Address"} inputName={"Enter Address"}></InputForm>
      <InputForm
        title={"PhoneNumber"}
        inputName={"Enter Phone Number"}
      ></InputForm>
      <InputForm title={"Email"} inputName={"Enter Email"}></InputForm>
      <p>quantity</p>
      <div className="flex flex-row gap-1">
        {" "}
        <button onClick={() => reduced(count)}> - </button>
        <p>{count}</p>
        <button onClick={() => increase(count)}> + </button>
      </div>
      {checkout ? (
        <Paypal quantity={count} price={priceProduct}></Paypal>
      ) : (
        <button onClick={() => PayPal()}>CheckOut</button>
      )}
    </div>
  );
};

export default InfoCustomer;
