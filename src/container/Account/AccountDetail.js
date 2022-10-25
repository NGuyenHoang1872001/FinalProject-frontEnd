import { useSelector } from "react-redux";
import { handleGetDetailUser } from "../../API/UserAPI";
import { useEffect, useState } from "react";
const AccountDetail = () => {
  const userloggedin = useSelector((state) => state.auth.id);
  const [detailUser, setDetailUSer] = useState();
  console.log(
    "🚀 ~ file: AccountDetail.js ~ line 7 ~ AccountDetail ~ detailUser",
    detailUser
  );

  const findDetailUser = async () => {
    try {
      const getDetailUser = await handleGetDetailUser(userloggedin);

      setDetailUSer(getDetailUser.data);
    } catch (error) {}
  };
  useEffect(() => {
    findDetailUser();
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
    </div>
  );
};

export default AccountDetail;
