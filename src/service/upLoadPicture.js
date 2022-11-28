import { storage } from "./fireBase";
import { ref, uploadBytes } from "firebase/storage";
import handleGetDownloadToken from "../API/Firebase";
const uploadPicture = async (picture) => {
  try {
    if (picture != null) {
      const imageRef = ref(storage, `images/${picture.name}`);
      uploadBytes(imageRef, picture);
    }
    const pictureName = picture.name;
    const responseFirebase = await handleGetDownloadToken(pictureName);
    const token = responseFirebase.downloadTokens;
    return token;
  } catch (error) {
    console.log(
      "🚀 ~ file: upLoadPicture.js ~ line 14 ~ uploadPicture ~ error",
      error
    );
  }
};
export default uploadPicture;
