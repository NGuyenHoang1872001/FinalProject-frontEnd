import { useQuery } from "react-query";
import { handleGetAllStore } from "../../API/UserAPI";
import { TableControl } from "react-bootstrap-table-control";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosCode } from "react-icons/io";

const OwnerUserTable = () => {
  const [userOwner, setUserOwner] = useState();
  const [currentSort, setCurrentSort] = useState("default");
  const handleGetData = async () => {
    try {
      const response = await handleGetAllStore();
      setUserOwner(response);
    } catch (error) {
      console.log(
        "🚀 ~ file: ownerUserTable.js:16 ~ handleGetData ~ error",
        error
      );
    }
  };
  const onSortChange = (typeSort, col) => {
    if (typeSort == "default") {
      setCurrentSort("down");
      const sorted = [...userOwner].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setUserOwner(sorted);
    } else if (typeSort == "down") {
      setCurrentSort("up");
      const sorted = [...userOwner].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setUserOwner(sorted);
    } else if (typeSort == "up") {
      setCurrentSort("default");
      handleGetData();
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className>
      <h1 className="text-4xl font-bold  mt-10 mb-10 ">
        User Table have Store
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
          <tbody>
            {userOwner &&
              userOwner.map((rows) => (
                <tr>
                  <td>
                    {rows.ownerId.firstName}
                    {""}
                    {rows.ownerId.lastName}
                  </td>
                  <td>{rows.ownerId.email} </td>
                  <td>{rows.ownerId.role} </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OwnerUserTable;
