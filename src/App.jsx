import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Public/home/home.js";
import Start from "./pages/Public/start/Start.js";
import SignUp from "./pages/Public/signUp/SignUp.js";
import Login from "./pages/Public/login/Login.js";
import StoreHardware from "./pages/Public/stores/StoreHardware.js";
import BaseLayout from "./layouts/base/BaseLayout.js";
import NavLayout from "./layouts/nav/NavLayout.js";
import Products from "./pages/Protected/Admin/products/Products.js";
import Components from "./pages/Protected/Admin/Components/Components.js";
import ProtectedRoute from "./components/utils/ProtectedRoute.js";
import Profile from "./pages/Protected/User/profile/Profile.js";
import AuthRoute from "./components/utils/AuthRoute.js";
import Modal from "react-modal";


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
                      <Route path="store/pc-hardware" element={<StoreHardware />} />
                      <Route path="store/server-hardware" element={<StoreHardware />} />
                  </Route>
                  <Route path="profile" element={<ProtectedRoute roles={["user", "admin"]}><Profile /></ProtectedRoute>} />
                  <Route path="products" element={<ProtectedRoute roles={["admin"]}><Products /></ProtectedRoute>} />
                  <Route path="components" element={<ProtectedRoute roles={["admin"]}><Components /></ProtectedRoute>} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
