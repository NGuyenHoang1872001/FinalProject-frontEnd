import { handleGetAllPost } from "../API/UserAPI";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostContainer = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const getAllPost = async () => {
    try {
      const postData = await handleGetAllPost();
      console.log(postData);
      setPost(postData);
    } catch (error) {
      console.log(
        "🚀 ~ file: HomePage.js ~ line 11 ~ handleGetAllPost ~ error",
        error
      );
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const getStore = async (store_Id) => {
    try {
      const storeId = store_Id;
      navigate("/viewStore", { state: { store_Id: storeId } });
    } catch (error) {
      console.log(
        "🚀 ~ file: postContainer.js ~ line 33 ~ getStore ~ error",
        error
      );
    }
  };
  return (
    <div className="flex flex-col p-[20px] items-center">
      <div></div>
      <div>
        <textarea
          className="textarea textarea-accent  w-[80vw] "
          placeholder="What do you think"
        ></textarea>
      </div>
      <div>
        {post.data &&
          post.data.map((rows) => (
            <div className="border m-[20px] rounded w-[80vw]">
              <div className="p-[20px]">
                <p key={rows._id}>{rows.title}</p>
                <p key={rows._id}>{rows.cover}</p>
              </div>
              <div className="flex flex-row justify-around ">
                <button className="border rounded w-[30vw] m-[2px]">
                  Like
                </button>
                <button className="border rounded w-[30vw] m-[2px]">
                  Comment
                </button>
                <button
                  className="border rounded w-[30vw] m-[2px]"
                  onClick={() => getStore(rows.store)}
                >
                  Store
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostContainer;
