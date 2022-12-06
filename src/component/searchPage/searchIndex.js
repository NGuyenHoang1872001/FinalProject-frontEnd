import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avata from "../Avata";
const SearchPage = () => {
  const { state } = useLocation();
  const { data } = state;

  const [dataUser, setDataUser] = useState();
  console.log("🚀 ~ file: searchIndex.js:9 ~ SearchPage ~ dataUser", dataUser);
  const navigate = useNavigate();
  const location = useLocation();
  const dataLogin = useSelector((state) => state.auth.id);
  const getDataUser = () => {
    try {
      setDataUser(data);
    } catch (error) {}
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
  useEffect(() => {
    getDataUser();
  }, [data]);
  return dataLogin ? (
    <div>
      {dataUser &&
        dataUser.map((rows) => (
          <div className="flex flex-row gap-4 rounded-2xl border-2 p-6 mt-3 w-[81vw]">
            <Avata width="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></Avata>
            <div>
              <div className="  font-semibold text-2xl">
                <button onClick={() => getUserPage(rows._id)}>
                  {rows.firstName}
                  {}
                  {rows.lastName}
                </button>
              </div>
              <p>{rows.email}</p>
            </div>
          </div>
        ))}{" "}
      {!dataUser == [] ? (
        <div>
          <h1 className="text-center text-4xl font-bold mt-20 w-[80vw]">
            No Data
          </h1>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  ) : (
    <navigate to="/login" replace state={{ from: location }} />
  );
};
export default SearchPage;
