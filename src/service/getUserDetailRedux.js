import { useSelector } from "react-redux";
const getUserDetailRedux = () => {
  try {
    const authLogin = useSelector((state) => state.auth);
    return authLogin;
  } catch (error) {}
};
export default getUserDetailRedux;
