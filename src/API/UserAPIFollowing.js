import axios from "axios";
const handleFollowing = async (id, following, url) => {
  try {
    const payload = { following };
    console.log(
      "🚀 ~ file: UserAPIFollowing.js:5 ~ handleFollowing ~ payload",
      payload
    );

    const URL = `${url}${id}`;
    const response = await axios.put(URL, payload);
    return response;
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPIFollowing.js ~ line 9 ~ handleLike ~ error",
      error
    );
  }
};
const handleUnFollowing = async (id, following, url) => {
  try {
    const payload = { following };

    const URL = `${url}${id}`;
    const response = await axios.put(URL, payload);

    return response;
  } catch (error) {
    console.log(
      "🚀 ~ file: UserAPIFollowing.js ~ line 24 ~ handleUnFollowing ~ error",
      error
    );
  }
};
export { handleFollowing, handleUnFollowing };
