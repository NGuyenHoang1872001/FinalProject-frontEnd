import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { handleCreateProduct } from "../../API/UserAPI";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  cover: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
});

const CreateProduct = () => {
  const { state } = useLocation();
  const { storeID } = state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const navigate = useNavigate();
  const authLogin = useSelector((state) => state.auth.id);
  const createProduct = async (data) => {
    try {
      const storeId = storeID;

      const name = data.name;
      const cover = data.cover;
      const description = data.description;
      const price = data.price;
      const payload = { storeId, name, cover, description, price };
      console.log(
        "🚀 ~ file: createProduct.js ~ line 38 ~ createProduct ~ payload",
        payload
      );
      console.log(
        "🚀 ~ file: createProduct.js ~ line 37 ~ createProduct ~ payload",
        payload
      );
      console.log(
        "🚀 ~ file: createProduct.js ~ line 30 ~ createProduct ~ data",
        data
      );

      const response = await handleCreateProduct(payload);
      navigate("/viewMyProduct");
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit(createProduct)}>
        <div>
          <textarea
            id="NameInput"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Name"
            {...register("name")}
          ></textarea>
          <span className="text-xs text-red">{errors?.name?.message}</span>
          <textarea
            id="cover"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Cover"
            {...register("cover")}
          ></textarea>
          <span className="text-xs text-red">{errors?.cover?.message}</span>
          <textarea
            id="Description"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Description"
            {...register("description")}
          ></textarea>
          <span className="text-xs text-red">
            {errors?.description?.message}
          </span>
          <textarea
            id="Price"
            className="textarea textarea-accent  w-[80vw] "
            placeholder="Price"
            {...register("price")}
          ></textarea>
          <span className="text-xs text-red">{errors?.price?.message}</span>
        </div>
        <div>
          <button>Create Product</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
