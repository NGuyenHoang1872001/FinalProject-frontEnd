import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { handleUpdateProduct } from "../../API/UserAPI";
import { useSelector } from "react-redux";
import uploadPicture from "../../service/upLoadPicture";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  quantity: yup.number().required().min(0),
  price: yup.number().required().min(0),
});

const UpdateProduct = () => {
  const { state } = useLocation();
  const { payload } = state;
  const [picture, setPicture] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const navigate = useNavigate();

  const updateProduct = async (data) => {
    try {
      if (picture) {
        const token = await uploadPicture(picture);
        console.log(
          "🚀 ~ file: UpdateProduct.js ~ line 36 ~ updateProduct ~ tonken",
          token
        );
        const pictureName = picture.name;
        const cover =
          process.env.React_App_Header_Firebase +
          pictureName +
          process.env.React_App_Footer_firebase +
          token;

        const productId = payload.productId;

        const name = data.name;

        const description = data.description;
        const price = data.price;

        const quantity = data.quantity;
        const productData = { name, cover, description, price, quantity };
        console.log(
          "🚀 ~ file: UpdateProduct.js ~ line 46 ~ updateProduct ~ payload",
          payload
        );

        const response = await handleUpdateProduct(productId, productData);
        navigate("/viewMyProduct");
      } else {
        const cover = payload.cover;
        const productId = payload.productId;

        const name = data.name;

        const description = data.description;
        const price = data.price;

        const quantity = data.quantity;
        const productData = { name, cover, description, price, quantity };
        console.log(
          "🚀 ~ file: UpdateProduct.js ~ line 79 ~ updateProduct ~ productData",
          productData
        );

        const response = await handleUpdateProduct(productId, productData);
        navigate("/viewMyProduct");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdateProduct.js ~ line 59 ~ updateProduct ~ error",
        error
      );
    }
  };
  const handleGetURLPicture = (event) => {
    const file = event.target.files[0];

    setPicture(file);
  };
  return (
    <div className="rounded-2xl border-2 p-10 w-[80vw] flex flex-col mt-3 ">
      <form onSubmit={handleSubmit(updateProduct)}>
        <div className="flex flex-col  gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">Updte Product</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Name</p>
            <textarea
              id="NameInput"
              className="textarea textarea-accent  w-[75vw] h-10"
              defaultValue={payload.name}
              {...register("name")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.name?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Description</p>
            <textarea
              id="Description"
              className="textarea textarea-accent  w-[75vw] h-10"
              defaultValue={payload.description}
              {...register("description")}
            ></textarea>
            <span className="text-xs text-red">
              {errors?.description?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Quantity</p>
            <textarea
              id="quantity"
              className="textarea textarea-accent  w-[75vw] h-10"
              defaultValue={payload.quantity}
              {...register("quantity")}
            ></textarea>
            <span className="text-xs text-red">
              {errors?.quantity?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Price</p>
            <textarea
              id="Price"
              className="textarea textarea-accent  w-[75vw] h-10 "
              defaultValue={payload.price}
              {...register("price")}
            ></textarea>
            <span className="text-xs text-red">{errors?.price?.message}</span>
          </div>
          <div>
            <input type="file" onChange={handleGetURLPicture}></input>
          </div>
        </div>

        <div className="text-center">
          <button className="mr-3 border-4 rounded-md w-32 text-lg font-medium">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
