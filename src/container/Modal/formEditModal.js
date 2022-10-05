import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../component/input/input";

import { useEffect, useState } from "react";
const schemaValidation = yup.object().shape({
  title: yup.string().required(),
  cover: yup.string().required(),
  store: yup.string().required(),
});

const FormEdit = ({ postId, payload }) => {
  console.log(
    "🚀 ~ file: formEditModal.js ~ line 14 ~ FormEdit ~ payload",
    payload
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-4"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Update Post</h3>
          <form onSubmit={handleSubmit()}>
            <div className="flex flex-col gap-4">
              <input
                className="border rounder-xl w-80 p-2"
                value={payload.cover}
              ></input>
              <input
                className="border rounder-xl w-80 p-2"
                value={payload.title}
              ></input>
              <input
                className="border rounder-xl w-80 p-2"
                value={payload.store}
              ></input>
            </div>
          </form>
          <div className="flex row justify-center gap-3">
            <label htmlFor="my-modal-4" className="border-2 width 30px">
              Update
            </label>
            <label htmlFor="my-modal-4" className="border-2 width 30px">
              {" "}
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEdit;
