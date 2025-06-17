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
import ProfileInfo from "./screens/Protected/User/profile/info/ProfileInfo.js";
import AuthRoute from "./components/utils/AuthRoute.js";
import Modal from "react-modal";
import StoreLayout from "./layouts/store/StoreLayout.js";
import Users from "./screens/Protected/Admin/users/Users.js";
import ShoppingCarts from "./screens/Protected/User/profile/carts/ShoppingCarts.js";
import ShoppingCart from "./screens/Protected/User/profile/carts/cart/ShoppingCart.js";
import Product from "./screens/Public/product/Product.js";
import AdminPanel from "./screens/Protected/Admin/panel/AdminPanel.js";
import Orders from "./screens/Protected/Admin/orders/Orders.js";
import Profile from "./screens/Protected/User/profile/Profile.js";
import MyOrders from "./screens/Protected/User/profile/orders/MyOrders.js";


Modal.setAppElement('#root')

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<BaseLayout />} >
                  <Route index element={<AuthRoute><Start /></AuthRoute>} />
                  <Route path="signUp/" element={<AuthRoute><SignUp /></AuthRoute>} />
                  <Route path="login/" element={<AuthRoute><Login /></AuthRoute>} />
                  <Route path="home/" element={<NavLayout />}>
                      <Route index element={<Home />} />
                  </Route>
                  <Route path="store/pc/" element={<StoreLayout />}>
                      <Route index element={<StoreHardware />} />
                  </Route>
                  {/*Rutas utiles para un usuario*/}
                  <Route path="profile/" element={<ProtectedRoute roles={["user", "organization", "admin"]} />}>
                      <Route index element={<Profile />} />
                      <Route path="info/" element={<ProfileInfo />} />
                      <Route path="orders/" element={<MyOrders />} />
                      <Route path="shoppingCarts/" element={<ShoppingCarts />} />
                      <Route path="shoppingCarts/:id" element={<ShoppingCart />} />
                  </Route>
                  {/* Acceso para user o admin */}
                  <Route element={<ProtectedRoute roles={["user", "organization", "admin"]} />}>
                      <Route path="Product/:id" element={<Product />} />
                  </Route>
                  {/* Solo para admin */}
                  <Route path={"admin/"} element={<ProtectedRoute roles={["admin"]} />}>
                      <Route index element={<AdminPanel />} />
                      <Route path="products/" element={<Products />} />
                      <Route path="components/" element={<Components />} />
                      <Route path="users/" element={<Users />} />
                      <Route path="orders/" element={<Orders />} />
                  </Route>
                  <Route path="unauthorized" element={<p>Unauthorized</p>} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
