import axios, { Axios } from "axios";
const handleGetDownloadToken = async (pictureName) => {
  try {
    console.log("Totott", pictureName);
    const URL = `https://firebasestorage.googleapis.com/v0/b/finalproject-8a79b.appspot.com/o/images%2F${pictureName}`;
    const response = await axios.get(URL);
    console.log(
      "🚀 ~ file: Firebase.js ~ line 7 ~ handleGetDownloadToken ~ response",
      response.data
    );

    return response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: Firebase.js ~ line 13 ~ handleGetDownloadToken ~ error",
      error
    );
  }
};
export default handleGetDownloadToken;
