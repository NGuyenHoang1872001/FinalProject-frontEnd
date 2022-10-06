import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../component/LoginPage/LoginPage";
import SignUp from "../component/SignUpPage/SignUpPage";
import NotFound from "../component/NotFoundPage/NotFound";
import HomePage from "../component/HomePage/HomePage";
import StorePage from "../container/storeContainer";
import CreatePost from "../container/Create/createPost";
import PostContainer from "../container/postContainer";
import UpdatePostPage from "../container/Update/UpdatePost";
import MyStore from "../container/Store/myStore";
import CreateStore from "../container/Create/createStore";
import UpdateStorePage from "../container/Update/UpdateStore";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<PostContainer />}></Route>
          <Route path="/viewStore" element={<StorePage />}></Route>
          <Route path="/createPost" element={<CreatePost />}></Route>
          <Route path="/updatePost" element={<UpdatePostPage />}></Route>
          <Route path="/viewOwnerStore" element={<MyStore />}></Route>
          <Route path="/createStore" element={<CreateStore />}></Route>
          <Route path="/updateStore" element={<UpdateStorePage />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
