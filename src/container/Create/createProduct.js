import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";
import { handleCreateProduct } from "../../API/UserAPI";
import { useSelector } from "react-redux";
import { storage } from "../../service/fireBase";
import { uploadBytes, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import handleGetDownloadToken from "../../API/Firebase";

const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  quantity: yup.number().required().min(1),
  price: yup.number().required().min(0),
});

const CreateProduct = () => {
  const { state } = useLocation();
  const { storeID } = state;
  const [picture, setPicture] = useState();
  console.log(
    "🚀 ~ file: createProduct.js ~ line 23 ~ CreateProduct ~ picture",
    picture
  );
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
      if (picture != null) {
        const imageRef = ref(storage, `images/${picture.name}`);
        await uploadBytes(imageRef, picture);
      }
      const pictureName = picture.name;
      console.log(
        "🚀 ~ file: createProduct.js ~ line 47 ~ createProduct ~ pictureName",
        pictureName
      );
      const responseFirebase = await handleGetDownloadToken(pictureName);
      console.log(
        "🚀 ~ file: createProduct.js ~ line 43 ~ createProduct ~ responseFirebase",
        responseFirebase
      );
      const token = responseFirebase.downloadTokens;

      const storeId = storeID;

      const name = data.name;
      const cover =
        process.env.React_App_Header_Firebase +
        pictureName +
        process.env.React_App_Footer_firebase +
        token;
      console.log(
        "🚀 ~ file: createProduct.js ~ line 50 ~ createProduct ~ cover",
        cover
      );
      const description = data.description;
      const price = data.price;
      const quantity = data.quantity;
      const payload = { storeId, name, cover, description, price, quantity };
      console.log(
        "🚀 ~ file: createProduct.js ~ line 40 ~ createProduct ~ payload",
        payload
      );
      const response = await handleCreateProduct(payload);
      navigate("/viewMyProduct");
    } catch (error) {
      console.log(
        "🚀 ~ file: createProduct.js ~ line 69 ~ createProduct ~ error",
        error
      );
    }
  };
  const handleGetURLPicture = (event) => {
    const file = event.target.files[0];
    console.log(
      "🚀 ~ file: createPost.js ~ line 61 ~ handleGetURLPicture ~ file",
      file
    );

    setPicture(file);
  };
  return (
    <div className="rounded-2xl border-2 p-10 w-[80vw] flex flex-col mt-3 ">
      <form onSubmit={handleSubmit(createProduct)}>
        <div className="flex flex-col  gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">Create Product</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Product Name</p>
            <textarea
              id="NameInput"
              className="textarea textarea-accent  w-[75vw] h-10"
              placeholder="Name"
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
              placeholder="Description"
              {...register("description")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.description?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">Price</p>
            <textarea
              id="Price"
              className="textarea textarea-accent  w-[75vw] h-10"
              placeholder="Price"
              {...register("price")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.price?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-3">PhoneNumber</p>
            <textarea
              id="quantity"
              className="textarea textarea-accent   w-[75vw] h-10 "
              placeholder="quantity"
              {...register("quantity")}
            ></textarea>
            <span className="text-xs text-red mt-2">
              {errors?.quantity?.message}
            </span>
          </div>
          <div>
            <input type="file" onChange={handleGetURLPicture}></input>
          </div>
          <div className="text-center">
            <button className="mr-3 border-4 rounded-md w-32 text-lg font-medium">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
