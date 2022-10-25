import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { handleUpdateProduct } from "../../API/UserAPI";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  cover: yup.string().required(),
  description: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
});

const UpdateProduct = () => {
  const { state } = useLocation();
  const { payload } = state;
  console.log(
    "🚀 ~ file: UpdateProduct.js ~ line 21 ~ UpdateProduct ~ payload",
    payload
  );

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
      const productId = payload.productId;

      const name = data.name;
      const cover = data.cover;
      const description = data.description;
      const price = data.price;
      const quantity = data.quantity;
      const productData = { name, cover, description, price, quantity };
      console.log(
        "🚀 ~ file: UpdateProduct.js ~ line 46 ~ updateProduct ~ payload",
        payload
      );

      const response = await handleUpdateProduct(productData, productId);
      navigate("/viewMyProduct");
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdateProduct.js ~ line 59 ~ updateProduct ~ error",
        error
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(updateProduct)}>
        <div>
          <textarea
            id="NameInput"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.name}
            {...register("name")}
          ></textarea>
          <span className="text-xs text-red">{errors?.name?.message}</span>
          <textarea
            id="cover"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.cover}
            {...register("cover")}
          ></textarea>
          <span className="text-xs text-red">{errors?.cover?.message}</span>
          <textarea
            id="Description"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.description}
            {...register("description")}
          ></textarea>
          <span className="text-xs text-red">
            {errors?.description?.message}
          </span>
          <textarea
            id="quantity"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.quantity}
            {...register("quantity")}
          ></textarea>
          <span className="text-xs text-red">{errors?.quantity?.message}</span>
          <textarea
            id="Price"
            className="textarea textarea-accent  w-[80vw] "
            defaultValue={payload.price}
            {...register("price")}
          ></textarea>
          <span className="text-xs text-red">{errors?.price?.message}</span>
        </div>
        <div>
          <button>Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
