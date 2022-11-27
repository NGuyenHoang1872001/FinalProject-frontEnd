import { useEffect, useState } from "react";

const ShowPicture = (cover) => {
  const [urlPicture, setUrlPicture] = useState([]);

  const getPicture = () => {
    try {
      const url = cover.cover;

      setUrlPicture(url);
    } catch (error) {
      console.log(
        "🚀 ~ file: showPicture.js ~ line 12 ~ getPicture ~ error",
        error
      );
    }
  };
  useEffect(() => {
    getPicture();
  }, [cover]);
  return (
    <div>
      <input type="checkbox" id="my-modal-5" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl h-[90vh]">
          <div class="modal-action">
            <label for="my-modal-5" class="btn">
              Yay!
            </label>
          </div>
          <div>
            <img
              src={urlPicture}
              className="block ml-auto mr-auto w-[60%] "
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPicture;
