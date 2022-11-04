import { useLocation, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import reactSelect from "react-select";
import { useEffect, useState } from "react";
import Paypal from "../../component/Paypal";

import InputForm from "../../component/input/input";
import { data } from "autoprefixer";
import ReactSelect from "react-select";

const InfoCustomer = () => {
  const schemaValidation = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    phoneNumber: yup.number().required(),
  });
  const {
    control,
    register,
    handleSubmit,
    field,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
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

  const handleCheckout = (data) => {
    console.log(
      "🚀 ~ file: informationPayPal.js ~ line 50 ~ handleCheckout ~ data",
      data.paymentMethod.value
    );
    const name = data.name;
    const address = data.address;
    const phoneNumber = data.phoneNumber;
    if (data.paymentMethod.value == "PayPal") {
      navigate("/payPal", {
        state: {
          nameProduct: name,
          addressProduct: address,
          phoneNumberProduct: phoneNumber,
          countProduct: count,
          priceProductData: priceProduct,
        },
      });
    } else navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCheckout)}>
        <textarea
          id="NameInput"
          className="textarea textarea-accent  w-[80vw] "
          placeholder="Name"
          {...register("name")}
        ></textarea>
        <textarea
          id="AddressInput"
          className="textarea textarea-accent  w-[80vw] "
          placeholder="Address"
          {...register("address")}
        ></textarea>
        <textarea
          id="PhoneNumberInput"
          className="textarea textarea-accent  w-[80vw] "
          placeholder="PhoneNumber"
          {...register("phoneNumber")}
        ></textarea>

        <p>quantity</p>
        <div className="flex flex-row gap-1">
          {" "}
          <button onClick={() => reduced(count)}> - </button>
          <p>{count}</p>
          <button onClick={() => increase(count)}> + </button>
        </div>
        <div>
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <ReactSelect
                isClearable
                {...field}
                options={[
                  { value: "COD", label: "COD" },
                  { value: "PayPal", label: "PayPal" },
                ]}
              />
            )}
          />
        </div>
        <div>
          <button>CheckOut</button>
        </div>
      </form>
    </div>
  );
};

export default InfoCustomer;
