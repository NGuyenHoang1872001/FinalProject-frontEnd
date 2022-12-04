import AllMemberTable from "../../component/Table/allMemberTable";
import OwnerUserTable from "../../component/Table/ownerUserTable";
import { useQuery } from "react-query";
const DashBoard = () => {
  return (
    <div className="">
      <AllMemberTable></AllMemberTable>
      <OwnerUserTable></OwnerUserTable>
    </div>
  );
};
export default DashBoard;
