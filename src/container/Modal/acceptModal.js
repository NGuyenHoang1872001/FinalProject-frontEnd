import { handleDeletePost } from "../../API/UserAPI";
const AcceptModal = (postId) => {
  const deletePost = async (req, res) => {
    try {
      const response = await handleDeletePost(postId);
    } catch (error) {}
  };
  return (
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
          <h3 className="text-lg font-bold">Are you sure ?</h3>
          <div className="flex row justify-center gap-3">
            <label
              htmlFor="my-modal-3"
              className="border-2 width 30px"
              onClick={() => deletePost()}
            >
              Yes
            </label>
            <label htmlFor="my-modal-3" className="border-2 width 30px">
              {" "}
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AcceptModal;
