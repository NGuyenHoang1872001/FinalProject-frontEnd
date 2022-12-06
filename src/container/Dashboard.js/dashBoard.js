import AllMemberTable from "../../component/Table/allMemberTable";
import OwnerUserTable from "../../component/Table/ownerUserTable";
import UserTableDontStore from "../../component/Table/userDontHaveStore";
import { useQuery } from "react-query";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const DashBoard = () => {
  const location = useLocation();
  const dataLogin = useSelector((state) => state.auth.id);
  const dataRole = useSelector((state) => state.auth.role);

  return dataLogin && dataRole == "admin" ? (
    <div className="flex flex-col pl-8 pr-12  rounded-2xl border-2 mt-3 shadow-lg w-[82vw]">
      <AllMemberTable></AllMemberTable>
      <OwnerUserTable></OwnerUserTable>
      <UserTableDontStore></UserTableDontStore>
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default DashBoard;
