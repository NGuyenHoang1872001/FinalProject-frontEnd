import AllMemberTable from "../../component/Table/allMemberTable";
import OwnerUserTable from "../../component/Table/ownerUserTable";
import UserTableDontStore from "../../component/Table/userDontHaveStore";
import { useQuery } from "react-query";
const DashBoard = () => {
  return (
    <div className="">
      <AllMemberTable></AllMemberTable>
      <OwnerUserTable></OwnerUserTable>
      <UserTableDontStore></UserTableDontStore>
    </div>
  );
};
export default DashBoard;
