import { useSelector } from "react-redux";
import { handleGetDetailUser } from "../../API/UserAPI";
import { useEffect, useState } from "react";
import { handleGetPostByAuthor } from "../../API/UserAPI";
const AccountDetail = () => {
  const userloggedin = useSelector((state) => state.auth.id);
  const [detailUser, setDetailUSer] = useState();
  const [postAuthor, setPostAuthor] = useState();
  console.log(
    "🚀 ~ file: AccountDetail.js ~ line 9 ~ AccountDetail ~ postAuthor",
    postAuthor
  );
  const getPostbyAuthor = async () => {
    try {
      const response = await handleGetPostByAuthor(userloggedin);
      setPostAuthor(response);
    } catch (error) {}
  };

  const findDetailUser = async () => {
    try {
      const getDetailUser = await handleGetDetailUser(userloggedin);

      setDetailUSer(getDetailUser.data);
    } catch (error) {}
  };
  useEffect(() => {
    findDetailUser();
    getPostbyAuthor();
  }, []);

  return (
    <div>
      {detailUser &&
        detailUser.map((users) => (
          <div>
            {" "}
            <p key={users._id}>ID: {users._id}</p>
            <p>
              Name: {users.firstName} {users.lastName}
            </p>
          </div>
        ))}

      {postAuthor &&
        postAuthor.map((postData) => (
          <div>
            <p>{postData.title}</p>
            <img src={postData.cover}></img>
          </div>
        ))}
    </div>
  );
};

export default AccountDetail;
