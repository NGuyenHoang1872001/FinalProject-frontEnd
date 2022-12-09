import { useQuery } from "react-query";
import { handleGetAllStore } from "../../API/UserAPI";
import { TableControl } from "react-bootstrap-table-control";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosCode } from "react-icons/io";
import StoreMonthly from "../chart/storeMonthlyChart";

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
      <div className="flex flex-row mt-10 mb-10 justify-between">
        {" "}
        <h1 className="text-4xl font-bold   ">User Table have Store</h1>
        <label for="my-modal-6" class="link">
          Open Dashboard
        </label>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-[75vw]">
          <thead>
            <tr className="font-bold text-black">
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
                <tr className="font-light text-black">
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
      <StoreMonthly></StoreMonthly>
    </div>
  );
};
export default OwnerUserTable;
