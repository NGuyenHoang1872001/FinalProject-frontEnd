import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avata from "../Avata";
const SearchPage = () => {
  const { state } = useLocation();
  const { data } = state;

  const [dataUser, setDataUser] = useState();
  const navigate = useNavigate();

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
  return (
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
      {
        <div>
          <h1 className="text-center text-4xl font-bold mt-20 w-[80vw]">
            No Data
          </h1>
        </div>
      }
    </div>
  );
};
export default SearchPage;
