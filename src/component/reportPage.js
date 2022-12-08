import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { handleGetAllPost, handleDeletePost } from "../API/UserAPI";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ReportPage = () => {
  const [postData, setPostData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const dataLogin = useSelector((state) => state.auth.id);
  const dataRole = useSelector((state) => state.auth.role);
  console.log("🚀 ~ file: reportPage.js:6 ~ ReportPage ~ postData", postData);
  const getAllPost = async () => {
    try {
      const response = await handleGetAllPost();
      console.log(
        "🚀 ~ file: reportPage.js:10 ~ getAllPost ~ response",
        response
      );
      setPostData(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: reportPage.js:10 ~ handleGetAllPost ~ error",
        error
      );
    }
  };
  const getUserPage = (userId) => {
    try {
      navigate("/userProfile", {
        state: {
          userId: userId,
        },
      });
    } catch (error) {}
  };
  const [postId, setPostId] = useState();
  const handleGetPostId = (id) => {
    try {
      setPostId(id);
    } catch (error) {}
  };
  const deletePost = async () => {
    const post = postId;
    const response = await handleDeletePost(post);

    getAllPost();
  };
  useEffect(() => {
    getAllPost();
  }, []);
  return dataLogin && dataRole == "admin" ? (
    <div className=" rounded-2xl border-2 p-10 w-[82vw] flex flex-col mt-3  ">
      {" "}
      <div className="text-center mb-12">
        <p className="text-3xl font-bold">Report Post</p>
      </div>
      {postData &&
        postData.map((rows) => (
          <div>
            {rows.report.length != 0 ? (
              <div className=" mb-[20px] rounded w-[78vw] relative shadow-mg border-2 p-4">
                <div className="flex flex-row justify-between">
                  {" "}
                  <p className="text-xl font-bold">
                    Number of User Report: {rows.report.length}
                  </p>
                  <label
                    for="my-modal-3"
                    class="link"
                    onClick={() => handleGetPostId(rows._id)}
                  >
                    Delete Post
                  </label>
                </div>

                <div>
                  <div className="p-[20px]">
                    <div className="flex flex-row mb-[20px]">
                      <div className="avatar">
                        <div className="w-12  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src="https://placeimg.com/192/192/people" />
                        </div>
                      </div>
                      <button
                        className="ml-[10px] font-medium"
                        onClick={() => {
                          getUserPage(rows.author._id);
                        }}
                      >
                        {rows.author.firstName} {rows.author.lastName}
                      </button>
                    </div>

                    <p key={rows._id} className="ml-7">
                      {rows.title}
                    </p>
                    <div className="mt-[20px] mb-8">
                      <img
                        src={rows.cover}
                        className="block ml-auto mr-auto w-[60%] "
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      {/* Modal */}
      <div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold text-center mb-10">
              Are you sure ?
            </h3>
            <div className="flex row justify-center gap-3">
              <label
                htmlFor="my-modal-3"
                className="border-2 rounded-2xl w-24 text-center"
                onClick={() => deletePost()}
              >
                Yes
              </label>
              <label
                htmlFor="my-modal-3"
                className="border-2 rounded-2xl w-24 text-center"
              >
                {" "}
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};
export default ReportPage;
