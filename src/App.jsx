import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./screens/Public/home/home.js";
import Start from "./screens/Public/start/Start.js";
import SignUp from "./screens/Public/signUp/SignUp.js";
import Login from "./screens/Public/login/Login.js";
import StoreHardware from "./screens/Public/stores/StoreHardware.js";
import BaseLayout from "./layouts/base/BaseLayout.js";
import NavLayout from "./layouts/nav/NavLayout.js";
import Products from "./screens/Protected/Admin/products/Products.js";
import Components from "./screens/Protected/Admin/components/Components.js";
import ProtectedRoute from "./components/utils/ProtectedRoute.js";
import Profile from "./screens/Protected/User/profile/Profile.js";
import AuthRoute from "./components/utils/AuthRoute.js";
import Modal from "react-modal";
import StoreLayout from "./layouts/store/StoreLayout.js";
import Users from "./screens/Protected/Admin/users/Users.js";
import ShoppingCarts from "./screens/Protected/User/shoppingCarts/ShoppingCarts.js";


Modal.setAppElement('#root')

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<BaseLayout />} >
                  <Route index element={<AuthRoute><Start /></AuthRoute>} />
                  <Route path="signUp" element={<AuthRoute><SignUp /></AuthRoute>} />
                  <Route path="login" element={<AuthRoute><Login /></AuthRoute>} />
                  <Route path="home/" element={<NavLayout />} >
                      <Route index element={<Home />} />
                  </Route>
                  <Route path="store/pc" element={<StoreLayout />}>
                      <Route index element={<StoreHardware />} />
                  </Route>
                  <Route path="profile" element={<ProtectedRoute roles={["user", "admin"]}><Profile /></ProtectedRoute>} />
                  <Route path="ShoppingCarts" element={<ProtectedRoute roles={["user", "admin"]}><ShoppingCarts /></ProtectedRoute>} />
                  <Route path="products" element={<ProtectedRoute roles={["admin"]}><Products /></ProtectedRoute>} />
                  <Route path="components" element={<ProtectedRoute roles={["admin"]}><Components /></ProtectedRoute>} />
                  <Route path="users" element={<ProtectedRoute roles={["admin"]}><Users /></ProtectedRoute>} />
                  <Route path="unauthorized" element={<p>Unauthorized</p>}></Route>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
