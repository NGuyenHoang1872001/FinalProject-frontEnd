import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../component/LoginPage/LoginPage";
import SignUp from "../component/SignUpPage/SignUpPage";
import NotFound from "../component/NotFoundPage/NotFound";
import HomePage from "../component/HomePage/HomePage";
import StorePage from "../container/storeContainer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/viewStore" element={<StorePage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
