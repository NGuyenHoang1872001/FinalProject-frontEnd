import { useQuery } from "react-query";
import { handleGetAllUser } from "../../API/UserAPI";
import { TableControl } from "react-bootstrap-table-control";
import { useState, useEffect } from "react";

import { IoIosArrowDown } from "react-icons/io";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosCode } from "react-icons/io";
const UserDontStore = () => {
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
      <h1 className="text-4xl font-bold  mt-10 mb-10 ">
        User Don't Have Store
      </h1>

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
                Email{" "}
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

          {userData &&
            userData.map((rows) => (
              <tbody>
                {" "}
                {rows.storeId ? (
                  <div></div>
                ) : (
                  <tr>
                    <td>
                      {rows.firstName}
                      {""}
                      {rows.lastName}
                    </td>
                    <td>{rows.email}</td>
                    <td>{rows.role}</td>
                  </tr>
                )}
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};
export default UserDontStore;
