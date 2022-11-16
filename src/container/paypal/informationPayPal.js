import { useLocation, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import reactSelect from "react-select";
import { useEffect, useState } from "react";
import Paypal from "../../component/Paypal";
import { useSelector, useDispatch } from "react-redux";

import InputForm from "../../component/input/input";
import { data } from "autoprefixer";
import ReactSelect from "react-select";
import { handleCreateInvoice } from "../../API/UserAPI";
import sendEmail from "../../service/sendEmailService";
import { handleUpdateProduct } from "../../API/UserAPI";

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
  const authLogin = useSelector((state) => state.auth);
  const stroreId = useSelector((state) => state.storeIdProduct.store_Id);
  const { state } = useLocation();
  const { product, quantityPr, priceProduct, storeEmail } = state;

  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [checkout, setCheckOut] = useState(false);

  const increase = (count) => {
    try {
      if (count < quantityPr) {
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

  const handleCheckout = async (data) => {
    try {
      const nameInput = data.name;
      const addressInput = data.address;
      const phoneNumberInput = data.phoneNumber;
      if (data.paymentMeth.value == "PayPal") {
        navigate("/payPal", {
          state: {
            nameProduct: nameInput,
            addressProduct: addressInput,
            phoneNumberProduct: phoneNumberInput,
            totalQuantity: quantityPr,
            countProduct: count,
            priceProductData: priceProduct,
            productID: product,
          },
        });
      } else {
        const name = nameInput;
        const address = addressInput;
        const phoneNumber = phoneNumberInput;
        const email = authLogin.email;
        const quantityProduct = count;
        const ammount = count * priceProduct;
        const paymentMethod = "COD";
        const productId = product;
        const userId = authLogin.id;
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
        };
        const newQuantity = quantityPr - quantityProduct;

        const response = await handleCreateInvoice(payload);
        const updateProduct = await handleUpdateProduct(productId, {
          quantity: newQuantity,
        });
        const createNewEmail = await sendEmail({
          email_store: { storeEmail },
          email_customer: { email },
          messageToCustomer: { paymentMethod, ammount },
        });

        navigate("/viewProcess");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: informationPayPal.js ~ line 109 ~ handleCheckout ~ error",
        error
      );
    }
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
            name="paymentMeth"
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
