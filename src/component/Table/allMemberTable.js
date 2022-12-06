import { useQuery } from "react-query";
import { handleGetAllUser, handleUpdateUser } from "../../API/UserAPI";
import { TableControl } from "react-bootstrap-table-control";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import UserMonthly from "../chart/userMonthlyChart";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosCode } from "react-icons/io";
const AllMemberTable = () => {
  const [userData, setUserData] = useState();

  const getAllUser = async () => {
    try {
      const getUser = await handleGetAllUser();
      setUserData(getUser);
    } catch (error) {}
  };
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const getUserName = (firstName, lastName, userID) => {
    try {
      const userFullName = firstName + lastName;
      setUserName(userFullName);
      setUserId(userID);
    } catch (error) {}
  };
  const handleUpdateAdmin = async () => {
    try {
      const role = "admin";
      const option = { role };
      const response = await handleUpdateUser(userId, option);
      getAllUser();
    } catch (error) {}
  };

  let [currentSort, setCurrentSort] = useState("default");

  const onSortChange = (typeSort, col) => {
    if (typeSort == "default") {
      setCurrentSort("down");
      const sorted = [...userData].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setUserData(sorted);
    } else if (typeSort == "down") {
      setCurrentSort("up");
      const sorted = [...userData].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setUserData(sorted);
    } else if (typeSort == "up") {
      setCurrentSort("default");
      getAllUser();
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className>
      <div className="flex flex-row mt-10 mb-10 justify-between ">
        {" "}
        <h1 className="text-4xl font-bold  ">User Table</h1>
        <label for="my-modal-6" class="link">
          Open Dashboard
        </label>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-[75vw] ">
          <thead>
            <tr className="">
              <th>
                Name{" "}
                <button onClick={() => onSortChange(currentSort, "firtName")}>
                  {currentSort == "down" ? (
                    <div>
                      <IoIosArrowDown></IoIosArrowDown>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {currentSort == "up" ? (
                    <div>
                      {" "}
                      <IoIosArrowUp></IoIosArrowUp>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {currentSort == "default" ? (
                    <div className="flex flex-row">
                      <div>
                        <IoIosCode />
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </button>
              </th>
              <th>
                Email
                <button onClick={() => onSortChange(currentSort, "email")}>
                  {currentSort == "down" ? (
                    <div>
                      <IoIosArrowDown></IoIosArrowDown>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {currentSort == "up" ? (
                    <div>
                      {" "}
                      <IoIosArrowUp></IoIosArrowUp>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {currentSort == "default" ? (
                    <div className="flex flex-row">
                      <div>
                        <IoIosCode />
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </button>
              </th>
              <th>
                Role{" "}
                <button onClick={() => onSortChange(currentSort, "role")}>
                  {currentSort == "down" ? (
                    <div>
                      <IoIosArrowDown></IoIosArrowDown>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {currentSort == "up" ? (
                    <div>
                      {" "}
                      <IoIosArrowUp></IoIosArrowUp>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {currentSort == "default" ? (
                    <div className="flex flex-row">
                      <div>
                        <IoIosCode />
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </button>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.map((rows) => (
                <tr>
                  <td>
                    {rows.firstName}
                    {""}
                    {rows.lastName}
                  </td>
                  <td>{rows.email}</td>
                  <td>{rows.role}</td>

                  {rows.role == "user" ? (
                    <td>
                      <label
                        for="my-modal-3"
                        class="link"
                        onClick={() =>
                          getUserName(rows.firstName, rows.lastName, rows._id)
                        }
                      >
                        Add Admin
                      </label>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <UserMonthly></UserMonthly>

      {/* Modal Question */}
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
              Are you sure you want {userName} to be an admin?
            </h3>
            <div className="flex row justify-center gap-3">
              <label
                htmlFor="my-modal-3"
                className="border-2 rounded-2xl w-24 text-center"
                onClick={() => handleUpdateAdmin()}
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
  );
};
export default AllMemberTable;
