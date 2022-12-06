import { useQuery } from "react-query";
import { handleGetAllUser } from "../../API/UserAPI";
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
      <div className="flex flex-row mt-10 mb-10 justify-between">
        {" "}
        <h1 className="text-4xl font-bold ">User Table</h1>
        <label for="my-modal-6" class="link">
          Open Dashboard
        </label>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-[60vw]">
          <thead>
            <tr>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <UserMonthly></UserMonthly>
    </div>
  );
};
export default AllMemberTable;
