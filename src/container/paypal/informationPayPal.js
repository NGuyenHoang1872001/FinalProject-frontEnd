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
    phoneNumber: yup.number().required().min(0),
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
    <div className="rounded-2xl border-2 p-10 w-[80vw] flex flex-col mt-3 ">
      <form onSubmit={handleSubmit(handleCheckout)}>
        <div className=" flex flex-col  gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">Information Detail</p>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Name</p>
            <textarea
              id="NameInput"
              className="textarea textarea-accent  w-[75vw] h-10 "
              placeholder="Name"
              {...register("name")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.name?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Address</p>
            <textarea
              id="AddressInput"
              className="textarea textarea-accent  w-[75vw] h-10"
              placeholder="Address"
              {...register("address")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.address?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">PhoneNumber</p>
            <textarea
              id="PhoneNumberInput"
              className="textarea textarea-accent   w-[75vw] h-10 "
              placeholder="PhoneNumber"
              {...register("phoneNumber")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.phoneNumber?.message}
            </span>
          </div>

          <div>
            <p>Method Payment</p>
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
            <p>Quantity</p>
            <div className="flex flex-row gap-1 ">
              {" "}
              <button onClick={() => reduced(count)}> - </button>
              <p>{count}</p>
              <button onClick={() => increase(count)}> + </button>
            </div>
          </div>
          <div className="text-center">
            <button className="mr-3 border-4 rounded-md w-32 text-lg font-medium">
              CheckOut
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InfoCustomer;
