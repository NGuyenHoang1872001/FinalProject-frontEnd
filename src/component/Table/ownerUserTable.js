import { useQuery } from "react-query";
import { handleGetAllStore } from "../../API/UserAPI";
import { TableControl } from "react-bootstrap-table-control";
import { useState } from "react";
const OwnerUserTable = () => {
  const { isLoading, error, data } = useQuery(
    "userTableNoStore",
    handleGetAllStore
  );
  console.log("🚀 ~ file: ownerUserTable.js:7 ~ OwnerUserTable ~ data", data);

  if (error) return <div>Something error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className>
      <h1 className="text-4xl font-bold  mt-10 mb-10 ">
        User Table have Store
      </h1>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-[60vw]">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((rows) => (
                <tr>
                  <td>
                    {rows.ownerId.firstName}
                    {""}
                    {rows.ownerId.lastName}
                  </td>
                  <td>{rows.ownerId.email}</td>
                  <td>{rows.ownerId.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OwnerUserTable;
