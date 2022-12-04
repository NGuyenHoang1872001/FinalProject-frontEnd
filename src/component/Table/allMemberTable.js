import { useQuery } from "react-query";
import { handleGetAllUser } from "../../API/UserAPI";
import { TableControl } from "react-bootstrap-table-control";
import { useState } from "react";
const AllMemberTable = () => {
  const { isLoading, error, data } = useQuery("userTable", handleGetAllUser);

  if (error) return <div>Something error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className>
      <h1 className="text-4xl font-bold  mt-10 mb-10 ">User Table</h1>
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
    </div>
  );
};
export default AllMemberTable;
